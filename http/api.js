export async function SummaryForm(
  name,
  phone,
  age,
  soda,
  beverage,
  reason,
  frequency,
  purchase,
  variant,
  sku,
  pricing,
  feedback,
  lat,
  long
) {


  const token = await AsyncStorage.getItem("token");
  const user = JSON.parse(token);
  const nameEl = user.name;
  const PhoneEl = user.phone;
  const locationsEl = user.region;

  const formData = new FormData();

  formData.append("place", "COKE");
  formData.append("ba_name", nameEl);
  formData.append("ba_phone", PhoneEl);
  formData.append("ba_region", locationsEl);
  formData.append("sub_1_1", name);
  formData.append("sub_1_2", phone);
  formData.append("sub_1_3", age);
  formData.append("sub_1_4", soda);
  formData.append("sub_1_5", beverage);
  formData.append("sub_1_6", reason);
  formData.append("sub_1_7", frequency);
  formData.append("sub_1_8", purchase);
  formData.append("sub_1_9", variant);
  formData.append("sub_1_10", sku);
  formData.append("sub_1_11", pricing);
  formData.append("sub_1_12", feedback);
  formData.append("sub_1_13", lat);
  formData.append("sub_1_14", long);


  const res = await fetch("https://iguru.co.ke/coke/api/BM.php", {
    method: "POST",
    body: formData,
  });

  // const data = await res.json();
  if (res.ok) {
    const data = await res.text(); // Read the response as plain text
    return data;
  } else {
    throw {
      message: data.msg,
      statusText: res.statusText,
      status: res.status,
    };
  }
}
