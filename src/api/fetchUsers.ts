import {serializeQuery} from "@/helpers/serializeQuery";
import {IUser} from "@/types/IUser";


export async function fetchUsers(queries?: Record<string, string | number>): Promise<IUser[]> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?${serializeQuery(queries)}`);
    return response.json();
}