class ImageUploader {
  async upload(file: File) {
    const url = 'https://api.cloudinary.com/v1_1/hihyu/image/upload';
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'bkxq6h09');

    const result = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    return await result.json();
  }
}

export default ImageUploader;
