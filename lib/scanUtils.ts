
// lib/documentScanUtils.ts
export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export const scanDocument = async (file: File) => {
    const base64Image = await convertFileToBase64(file);
    console.log(base64Image)
};