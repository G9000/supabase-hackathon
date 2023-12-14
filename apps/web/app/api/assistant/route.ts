import { NextResponse } from "next/server";
import {
  // createAssistant,
  // updateAssistant,
  getAssistant,
  // deleteAssistant,
  dashId,
} from "assistant";

// Hanlde creation of assistant or assistnt with files id
// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const name = formData.get("name") as string;
//     const instructions = formData.get("instructions") as string;
//     const model = formData.get("model") as string;

//     if (!name || !instructions) {
//       return NextResponse.json(
//         { message: "fields are required" },
//         { status: 400 }
//       );
//     }

//     const newAssistant = await createAssistant({ name, instructions, model });

//     return NextResponse.json({ newAssistant });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

// Update assistant
// export async function PUT(request: Request) {
//   try {
//     const formData = await request.formData();
//     const assistantId = formData.get("assistantId") as string;
//     const instructions = formData.get("instructions") as string;
//     const model = formData.get("model") as string;

//     if (!assistantId || !instructions) {
//       return NextResponse.json(
//         { message: "fields are required" },
//         { status: 400 }
//       );
//     }

//     const assistant = await updateAssistant({
//       assistantId,
//       instructions,
//       model,
//     });

//     return NextResponse.json({ assistant });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

// Get assistant
export async function GET() {
  try {
    const assistant = await getAssistant(dashId);

    return NextResponse.json({ assistant });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Delete assistant
// export async function DELETE(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const assistantId = searchParams.get("assistantId");

//     if (!assistantId) {
//       return NextResponse.json({ error: "Missing Query" }, { status: 400 });
//     }
//     const delAssistant = await deleteAssistant(assistantId);

//     return NextResponse.json({ delAssistant });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
