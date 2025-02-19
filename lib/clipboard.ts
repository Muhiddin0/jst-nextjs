import axios from "axios";

interface ClipBoardResponse {
  message: string;
  status: boolean;
}

export const copyImageToClipboard = async (
  imageBlob: Blob,
): Promise<ClipBoardResponse> => {
  try {
    const mimeType = imageBlob.type;

    const image = new ClipboardItem({ [mimeType]: imageBlob });
    await navigator.clipboard.write([image]);

    return {
      message: "Rasim vaqtinchalik hotiraga saqlandi",
      status: true,
    };
  } catch (err) {
    console.log(err);

    return {
      message: "Rasim saqlashda xatolik yuz berdi",
      status: false,
    };
  }
};

export const imageToBlob = async (url: string): Promise<Blob> => {
  try {
    // Fetch the image from the URL
    const response = await fetch(url);

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Convert the response to a Blob
    const blob = await response.blob();

    return blob;
  } catch (error) {
    console.error("Error fetching image as blob:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export const copyTxtToClipboard = async (
  text: string,
): Promise<ClipBoardResponse> => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return {
        message: "Matin vaqtinchalik hotiraga saqlandi",
        status: true,
      };
    } catch (err) {
      return {
        message: "Matin saqlashda xatolik yuz berdi",
        status: false,
      };
    }
  } else {
    return {
      message: "Sizning brauzeringiz buni qo'llab quvvatlamaydi",
      status: false,
    };
  }
};

interface CopyClipboardResponse {
  text?: ClipBoardResponse;
  image?: ClipBoardResponse;
}

export const copyClipBoard = async ({
  text,
  img,
}: {
  text?: string;
  img?: string;
}): Promise<CopyClipboardResponse> => {
  let response = {} as CopyClipboardResponse;

  if (text) {
    response["text"] = await copyTxtToClipboard(text);
  }

  if (img) {
    const imgRes = await axios.get(img, {
      responseType: "blob",
    });

    const blob = imgRes.data;
    response["image"] = await copyImageToClipboard(blob);
  }
  return response;
};
