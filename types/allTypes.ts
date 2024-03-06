export type currentUser =
    | {
          id?: string | null | undefined;
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
      }
    | undefined;

export type User = {
    id: String;
    name: String;
    email: String;
    image: String;
};

export type Chat = {
    id: string;
    gname: string | null;
    members: User[];
    isGroup: boolean;
    groupPhoto: string | null;
    messages?: Message[];
    createdAt: Date;
    lastMessageAt: Date;
};

export type Message = {
    id: String;
    chatId: String;
    senderId: String;
    text: String;
    photo: String;
    seenBy: User[];
};
