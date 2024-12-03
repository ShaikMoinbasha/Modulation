import supabase from "../common/DBconnection.ts";

export async function checkByID(meme_id: string) {
  const { data: meme, error } = await supabase
    .from("Contest_Entry")
    .select("*")
    .eq("meme_id", meme_id);

  if (error) {
    console.error("Error fetching meme:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching contest entry data(provide correct memeId" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!meme || meme.length === 0) {
    console.log(`Meme with meme_id: ${meme_id} not found.`);
    return new Response(
      JSON.stringify({ message: "Meme ID not found in Contest_Entry table" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  console.log("Meme found:", meme);
  return new Response(JSON.stringify(meme), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


export async function updateStatus(meme_id: string, new_status: string) {
  const checkResponse = await checkByID(meme_id);

  if (checkResponse.status !== 200) {
    return checkResponse; // If meme_id is not found, return error response
  }

  const { data, error } = await supabase
    .from("Contest_Entry")
    .update({ status: new_status })  // Updating the status field
    .eq("meme_id", meme_id)
    .select();  // Ensure we return the updated row

  if (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update status" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // Return the updated data
  return new Response(
    JSON.stringify({ message: "Status updated successfully", data }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

