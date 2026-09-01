const BASE_URL = "http://localhost:5000";

export async function getCrops() {
  const res = await fetch(`${BASE_URL}/crops`);
  return res.json();
}

export async function addCrop(crop) {
  const res = await fetch(`${BASE_URL}/crops`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(crop),
  });
  return res.json();
}