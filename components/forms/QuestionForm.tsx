"use client";

import { AskAQuestionSchema } from "@/lib/validations";
import React, { useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import TagCard from "../cards/TagCard";
import { createQuestion } from "@/lib/actions/question.action";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { LoaderIcon } from "lucide-react";

const QuestionForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const editorRef = useRef<MDXEditorMethods>(null);
  const Editor = dynamic(() => import("@/components/editor"), {
    // Make sure we turn SSR off
    ssr: false,
  });

  const form = useForm<z.infer<typeof AskAQuestionSchema>>({
    resolver: zodResolver(AskAQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = async (
    data: z.infer<typeof AskAQuestionSchema>
  ) => {
    startTransition(async () => {
      const content = editorRef.current?.getMarkdown() || data.content;
      const result = await createQuestion({ ...data, content });
      if (result.success) {
        toast.success("Success", {
          description: "Question created successfully.",
        });
        router.push(ROUTES.QUESTION(result.data!._id));
      } else {
        toast.error("Error", {
          description: result.error?.message || "Failed to create question.",
        });
      }
    });
  };

  const handleRemoveTag = (tag: string, field: { value: string[] }) => {
    const updatedTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", updatedTags);
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[]; onChange: (tags: string[]) => void }
  ) => {
    if (e.key === "Enter" && field.value.length < 3) {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (
        tagInput &&
        !field.value.includes(tagInput) &&
        tagInput.length <= 15
      ) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", { message: "Tag already existed." });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you’re asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <Editor
                      editorRef={editorRef}
                      markdown={field.value}
                      fieldChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you&apos;ve put in the
                title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 flex flex-wrap gap-2.5">
                      {field?.value?.map((tag: string) => (
                        <TagCard
                          key={tag}
                          name={tag}
                          _id={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleRemoveTag(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end w-full">
          <Button
            type="submit"
            disabled={isPending}
            className="primary-gradient w-fit !text-light-900"
          >
            {isPending ? (
              <>
                <LoaderIcon className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
              <>Ask A Question</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
