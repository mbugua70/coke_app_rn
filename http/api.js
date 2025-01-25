import AsyncStorage from '@react-native-async-storage/async-storage'

export async function SummaryForm(
  name,
  phone,
  age,
  frequency,
  purchase,
  variant,
  sku,
  pricing,
  feedback,
  lat,
  long
) {
  console.log("API Testing location", lat, long);

  const token = await AsyncStorage.getItem("token");
  console.log("Token from AsyncStorage:", token);
  if (!token) {
    throw new Error("No token found in AsyncStorage.");
  }

  let user;
  try {
    user = JSON.parse(token);
  } catch (error) {
    throw new Error("Failed to parse token.");
  }

  const nameEl = user?.name || "Unknown";
  const PhoneEl = user?.phone || "Unknown";
  const locationsEl = user?.region || "Unknown";

  const formData = new FormData();
  formData.append("place", "COKE");
  formData.append("ba_name", nameEl);
  formData.append("ba_phone", PhoneEl);
  formData.append("ba_region", locationsEl);
  formData.append("sub_1_1", name);
  formData.append("sub_1_2", phone);
  formData.append("sub_1_3", age);
  // formData.append("sub_1_4", soda);
  // formData.append("sub_1_5", beverage);
  // formData.append("sub_1_6", reason);
  formData.append("sub_1_7", frequency);
  formData.append("sub_1_8", purchase);
  formData.append("sub_1_9", variant);
  formData.append("sub_1_10", sku);
  formData.append("sub_1_11", pricing);
  formData.append("sub_1_12", feedback);
  formData.append("sub_1_13", lat ?? "0");
  formData.append("sub_1_14", long ?? "0");

  console.log("Submitting data:", Object.fromEntries(formData.entries()));

  const res = await fetch("https://iguru.co.ke/coke/api/BM.php", {
    method: "POST",
    body: formData,
  });

  console.log("API Response:", res);
  const data = await res.text(); // Handle as plain text
  if (res.ok) {
    return data;
  } else {
    throw {
      message: data || "Submission failed.",
      statusText: res.statusText,
      status: res.status,
    };
  }
}


export async function fetchRecordData(phone) {

      const baPhone = {
        ba_phone: phone
      }

      const encodedDat = new URLSearchParams(baPhone).toString();

     try{
         const response = await fetch(`https://iguru.co.ke/coke/api/REPORT.php/`, {
             method:"POST",
             headers:{
               "Content-Type": "application/x-www-form-urlencoded",
               },
               body: encodedDat
         });


         if(!response.ok){
             throw new Error("Failed to fetch package data");
         }
         const data = await response.text();
         console.log("Response text", data);
         return  data;
     }catch(error){
         console.log("Error found");
         console.error('Error fetching package data:',error);
         return error;
     }
 }