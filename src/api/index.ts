import axios from "axios";

export function getPosts(title = '') {
    const url = new URL('https://jsonplaceholder.typicode.com/posts');
    if (title) {
        url.searchParams.set('title_like', title);
    }
    return axios
        .get(url.href)
        .then(({ data }) => data);
}
