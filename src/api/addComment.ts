import {IComment} from "@/types/IComment";

type TBody = {
    body: string,
    postId: string,
    name: string,
}

export async function addComment(body: TBody): Promise<IComment> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(body),
    });
    return response.json();
}