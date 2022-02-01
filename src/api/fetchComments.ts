import {serializeQuery} from "@/helpers/serializeQuery";
import {IComment} from "@/types/IComment";


export async function fetchComments(queries: Record<string, string | number>): Promise<Array<IComment>> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?${serializeQuery(queries)}`);
    return response.json();
}