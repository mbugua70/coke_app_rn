export async function SummaryForm(test) {
    const token = await AsyncStorage.getItem("token")
    if(token){
        const user = JSON.parse(token);
        const nameEl = user.name;
        const PhoneEl = user.phone;
        const locationsEl = user.region
    }

    const data_one = { ...test };

    const formData = new FormData();

    for (const key in data_one) {
      if (data_one.hasOwnProperty(key)) {
        formData.append(key, data_one[key]);
      }
    }

        formData.append("place", "ON_GO_SUMMARY");
        formData.append("ba_name", nameEl);
        formData.append("ba_phone", PhoneEl);
        formData.append("ba_region", locationsEl);



    const res = await fetch("https://iguru.co.ke/skope_api/BM.php", {

      method: "POST",
      body: formData,
    });

    // const data = await res.json();
    if (res.ok) {
      const data = await res.text(); // Read the response as plain text
      return data

    }else{
      throw {
        message: data.msg,
        statusText: res.statusText,
        status: res.status,
      };
    }

  }