import qs from "query-string"


interface UrlQueryParams {
    params: string
    key: string
    value: string
}

export formUrlQuery = ({ params, key, value }: UrlQueryParams) => {

    const queryString = qs.parse(params)

    queryString[key] = value

    return qs.stringify({
        url: window.location.pathname,
        query: queryString
    }
    )
}