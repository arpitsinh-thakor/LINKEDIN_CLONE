export interface Post {
    id: number;
    title: string;
    email: string;
    content: string;
    published: boolean
    authorId: number
    author: {
        name: string
    }
    comments: Comment[]
}
export interface Author {
    id: number;
    name: string;
    email: string;
    posts: Post[];
    comments: Comment[];
}
export interface Comment {
    id: number;
    text: string;
    author: {
        name: string
    }
}