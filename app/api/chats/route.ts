import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { currentUser, members, isGroup, gname, groupPhoto } = body;
        const currentUserId = await prisma.user.findUnique({
            where: { email: currentUser },
        });
        // console.log("So far good" + currentUserId?.id);

        const query = isGroup
            ? {
                  isGroup,
                  gname,
                  groupPhoto,
                  members: {
                      some: {
                          id: {
                              in: [currentUserId?.id, ...members],
                          },
                      },
                  },
              }
            : {
                  members: {
                      every: {
                          id: {
                              in: [currentUserId?.id, ...members],
                          },
                      },
                  },
              };

        let chat = await prisma.chat.findFirst({
            where: query,
        });

        if (!chat) {
            chat = await prisma.chat.create({
                data: isGroup
                    ? {
                          isGroup,
                          groupPhoto,
                          gname,
                          members: {
                              connect: [currentUserId?.id, ...members].map(
                                  (id) => ({ id })
                              ),
                          },
                      }
                    : {
                          members: {
                              connect: [currentUserId?.id, ...members].map(
                                  (id) => ({ id })
                              ),
                          },
                      },
            });
        }
        return NextResponse.json("Creating New Chats was Successful", {
            status: 201,
        });
    } catch (error) {
        return NextResponse.json("Failed to Create New Chats", { status: 400 });
    }
};
