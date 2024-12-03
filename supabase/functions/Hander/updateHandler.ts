import { updateStatus } from "../Repository/updateRepo.ts";


export default async function handleUpdate(req: Request) {
  try {
    const { meme_id, new_status } = await req.json();

    if (!meme_id || !new_status) {
      return new Response(
        JSON.stringify({ error: "Both meme_id and new_status are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updateResponse = await updateStatus(meme_id, new_status);
    const result = await updateResponse.json();

    return new Response(
      JSON.stringify(result),
      { status: updateResponse.status, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in handleUpdate:", error);
    return new Response(
      JSON.stringify({ error: "An internal server error occurred", details: error instanceof Error ? error.message:error}),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
