import { BASE_URL } from "./globalData";
import { Root } from "./jsonresponse";

export async function GetAlumni({ id = "", nama = "", kelas = "", nowa = "",  status = ""}) {
  const data = {
    id: id,
    nama: nama,
    kelas: kelas,
    nowa: nowa,
    status: status,
  };

  console.log(data);
  // Membuat query string dari objek data
  const queryString = new URLSearchParams(data).toString();

  try {
    const res = await fetch(
      `${BASE_URL}/api/kawalikasaba/?${queryString}`,
      {
        method: "GET",
      }
    );

    const jsonData = await res.json();
    console.log(jsonData);
    const result: Root = jsonData;

    return result;
  } catch (error) {
    console.log("Error while fetching:", error);
    throw error;
  }
}

export async function AddAlumni(request: any) {
  const formData = new FormData();
  formData.append("nama", request.nama);
  formData.append("kelas", request.kelas);
  formData.append("nowa", request.nowa);
  formData.append("status", request.status);
  formData.append("jumlah", request.jumlah);

  try {
    const res = await fetch(`${BASE_URL}/api/kawalikasaba`, {
      method: "POST",
      body: formData,
    });

    const jsonData = await res.json();
    const result: Root = jsonData;

    return result;
  } catch (error) {
    console.error("Error while fetching:", error);
    throw error;
  }
}

export async function UpdateAlumni(request: any) {
  const formData = new FormData();
  formData.append("id", request.id);
  formData.append("nama", request.nama);
  formData.append("kelas", request.kelas);
  formData.append("nowa", request.nowa);
  formData.append("status", request.status);
  formData.append("jumlah", request.jumlah);

  try {
    const res = await fetch(`${BASE_URL}/api/kawalikasaba/update`, {
      method: "POST",
      body: formData,
    });

    const jsonData = await res.json();
    const result: Root = jsonData;

    return result;
  } catch (error) {
    console.error("Error while fetching:", error);
    throw error;
  }
}

export async function DeleteAlumni(id: number) {
  try {
    const res = await fetch(`${BASE_URL}/api/kawalikasaba/${id}`, {
      method: "DELETE",
    });

    const jsonData = await res.json();
    const result: Root = jsonData;

    return result;
  } catch (error) {
    console.error("Error while fetching:", error);
    throw error;
  }
}