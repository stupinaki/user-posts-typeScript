import {serializeQuery} from "@/helpers/serializeQuery";
import {IPost} from "@/types/IPost";

export async function fetchPosts(queries?: Record<string, string | number>): Promise<IPost[]> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${serializeQuery(queries)}`);
    return response.json();
}