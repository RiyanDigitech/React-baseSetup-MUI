// // import React, { useRef, useState } from "react";
// // import {
// //   StandaloneSearchBox,
// //   useJsApiLoader,
// //   LoadScriptProps,
// // } from "@react-google-maps/api";

// // const libraries: LoadScriptProps["libraries"] = ["places"];

// // const AddressAutocomplete: React.FC = () => {
// //   const inputRef = useRef<google.maps.places.SearchBox | null>(null);
// //   const [addressDetails, setAddressDetails] = useState<{
// //     address?: string;
// //     latitude?: number;
// //     longitude?: number;
// //     city?: string;
// //     province?: string;
// //     country?: string;
// //     postalCode?: string;
// //     district?: string;
// //   }>({});

// //   const { isLoaded, loadError } = useJsApiLoader({
// //     id: "google-map-script",
// //     googleMapsApiKey: "AIzaSyBLiH_7xT_QlJVurMSa3iZ4Pq5S6WAe6zY", // Replace with your Google Maps API key
// //     libraries,
// //   });

// //   const handleOnPlaceChanged = () => {
// //     if (inputRef.current) {
// //       const places = inputRef.current.getPlaces();
// //       console.log(places, "places");
// //       if (places && places.length > 0) {
// //         const place = places[0];

// //         // Extract latitude and longitude
// //         const latitude = place.geometry?.location?.lat();
// //         const longitude = place.geometry?.location?.lng();

// //         // Extract detailed components
// //         const addressComponents = place.address_components || [];

// //         // Log address components to check the data
// //         console.log("Address Components:", addressComponents);

// //         const getComponent = (type: string) =>
// //           addressComponents.find((component) => component.types.includes(type))
// //             ?.long_name;

// //         const city = getComponent("locality");
// //         const province = getComponent("administrative_area_level_1");
// //         const country = getComponent("country");
// //         const postalCode = getComponent("postal_code");
// //         const district = getComponent("administrative_area_level_2");

// //         setAddressDetails({
// //           address: place.formatted_address,
// //           latitude,
// //           longitude,
// //           city,
// //           province,
// //           country,
// //           postalCode,
// //           district,
// //         });
// //       } else {
// //         console.error("No places found.");
// //       }
// //     }
// //   };

// //   if (loadError) {
// //     return <div>Error loading Google Maps API: {loadError.message}</div>;
// //   }

// //   return (
// //     <div className="p-5">
// //       {isLoaded ? (
// //         <>
// //           <StandaloneSearchBox
// //             onLoad={(ref) => (inputRef.current = ref)}
// //             onPlacesChanged={handleOnPlaceChanged}
// //           >
// //             <input
// //               type="text"
// //               placeholder="Enter area"
// //               style={{
// //                 width: "100%",
// //                 padding: "10px",
// //                 fontSize: "16px",
// //                 border: "1px solid #ccc",
// //                 borderRadius: "4px",
// //               }}
// //             />
// //           </StandaloneSearchBox>

// //           {/* Display Address Details */}
// //           {addressDetails.address && (
// //             <div className="mt-4 p-4 border rounded bg-gray-100">
// //               <h4 className="font-bold mb-2">Selected Address Details:</h4>
// //               <p>
// //                 <strong>Address:</strong> {addressDetails.address}
// //               </p>
// //               <p>
// //                 <strong>Latitude:</strong> {addressDetails.latitude}
// //               </p>
// //               <p>
// //                 <strong>Longitude:</strong> {addressDetails.longitude}
// //               </p>
// //               <p>
// //                 <strong>City:</strong> {addressDetails.city}
// //               </p>
// //               <p>
// //                 <strong>Province:</strong> {addressDetails.province}
// //               </p>
// //               <p>
// //                 <strong>Country:</strong> {addressDetails.country}
// //               </p>
// //               <p>
// //                 <strong>Postal Code:</strong> {addressDetails.postalCode}
// //               </p>
// //               <p>
// //                 <strong>District:</strong> {addressDetails.district}
// //               </p>
// //             </div>
// //           )}
// //         </>
// //       ) : (
// //         <div>Loading...</div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AddressAutocomplete;
// import React, { useRef, useState } from "react";
// import {
//   StandaloneSearchBox,
//   useJsApiLoader,
//   LoadScriptProps,
// } from "@react-google-maps/api";

// const libraries: LoadScriptProps["libraries"] = ["places"];

// const AddressAutocomplete: React.FC = () => {
//   const inputRef = useRef<google.maps.places.SearchBox | null>(null);

//   const [formData, setFormData] = useState({
//     address: "",
//     latitude: "",
//     longitude: "",
//     city: "",
//     province: "",
//     country: "",
//     postalCode: "",
//     district: "",
//   });

//   const { isLoaded, loadError } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyBLiH_7xT_QlJVurMSa3iZ4Pq5S6WAe6zY", // Replace with your Google Maps API key
//     libraries,
//   });

//   const handleOnPlaceChanged = () => {
//     if (inputRef.current) {
//       const places = inputRef.current.getPlaces();
//       if (places && places.length > 0) {
//         const place = places[0];

//         // Extract latitude and longitude
//         const latitude = place.geometry?.location?.lat()?.toString() || "";
//         const longitude = place.geometry?.location?.lng()?.toString() || "";

//         // Extract detailed components
//         const addressComponents = place.address_components || [];
//         const getComponent = (type: string) =>
//           addressComponents.find((component) => component.types.includes(type))
//             ?.long_name || "";

//         const city = getComponent("locality");
//         const province = getComponent("administrative_area_level_1");
//         const country = getComponent("country");
//         const postalCode = getComponent("postal_code"); // Check postal_code here
//         const district = getComponent("administrative_area_level_2");

//         // Update form data
//         setFormData({
//           address: place.formatted_address || "",
//           latitude,
//           longitude,
//           city,
//           province,
//           country,
//           postalCode,
//           district,
//         });
//       } else {
//         console.error("No places found.");
//       }
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Submitted Data:", formData);
//     // You can now send `formData` to the server via an API call
//   };

//   if (loadError) {
//     return <div>Error loading Google Maps API: {loadError.message}</div>;
//   }

//   return (
//     <div className="p-5">
//       {isLoaded ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <StandaloneSearchBox
//             onLoad={(ref) => (inputRef.current = ref)}
//             onPlacesChanged={handleOnPlaceChanged}
//           >
//             <>
//               <input
//                 type="text"
//                 placeholder="Enter area"
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   fontSize: "16px",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                 }}
//               />
//             </>
//           </StandaloneSearchBox>

//           {/* Form Fields */}
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             placeholder="Address"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="latitude"
//             value={formData.latitude}
//             onChange={handleInputChange}
//             placeholder="Latitude"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="longitude"
//             value={formData.longitude}
//             onChange={handleInputChange}
//             placeholder="Longitude"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleInputChange}
//             placeholder="City"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="province"
//             value={formData.province}
//             onChange={handleInputChange}
//             placeholder="Province"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="country"
//             value={formData.country}
//             onChange={handleInputChange}
//             placeholder="Country"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleInputChange}
//             placeholder="Postal Code"
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="district"
//             value={formData.district}
//             onChange={handleInputChange}
//             placeholder="District"
//             className="w-full p-2 border rounded"
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded"
//           >
//             Submit
//           </button>
//         </form>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// };

// export default AddressAutocomplete;
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  StandaloneSearchBox,
  useJsApiLoader,
  LoadScriptProps,
} from "@react-google-maps/api";

const libraries: LoadScriptProps["libraries"] = ["places"];

interface FormData {
  address: string;
  latitude: string;
  longitude: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  district: string;
}

const AddressAutoComplete: React.FC = () => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [initialData, setInitialData] = useState<FormData | null>(null);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBLiH_7xT_QlJVurMSa3iZ4Pq5S6WAe6zY", // Replace with your Google Maps API key
    libraries,
  });

  useEffect(() => {
    // API se data fetch karna (initial data)
    // Sample data jo aap ne diya hai
    const apiData = {
      address: "gulshan e iqbal",
      latitude: "-77.036400",
      longitude: "85.051100",
      city: "karachi",
      province: "",
      country: "Pakistan",
      postalCode: "",
      district: "",
    };
    setInitialData(apiData);

    // Form ko initial data se populate karna
    if (apiData) {
      setValue("address", apiData.address);
      setValue("latitude", apiData.latitude);
      setValue("longitude", apiData.longitude);
      setValue("city", apiData.city);
      setValue("province", apiData.province || "");
      setValue("country", apiData.country);
      setValue("postalCode", apiData.postalCode || "");
      setValue("district", apiData.district || "");
    }
  }, [setValue]);

  const handleOnPlaceChanged = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];

        // Extract latitude and longitude
        const latitude = place.geometry?.location?.lat()?.toString() || "";
        const longitude = place.geometry?.location?.lng()?.toString() || "";

        // Extract detailed components
        const addressComponents = place.address_components || [];
        const getComponent = (type: string) =>
          addressComponents.find((component) => component.types.includes(type))
            ?.long_name || "";

        const city = getComponent("locality");
        const province = getComponent("administrative_area_level_1");
        const country = getComponent("country");
        const postalCode = getComponent("postal_code");
        const district = getComponent("administrative_area_level_2");

        // Update form data with new address information
        setValue("address", place.formatted_address || "");
        setValue("latitude", latitude);
        setValue("longitude", longitude);
        setValue("city", city);
        setValue("province", province);
        setValue("country", country);
        setValue("postalCode", postalCode);
        setValue("district", district);
      } else {
        console.error("No places found.");
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    // Update API ko data bhejna
    try {
      const response = await fetch("YOUR_API_URL", {
        method: "PUT", // Ya POST agar update hai to
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("API Response: ", result);
      // Handle success or error
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps API: {loadError.message}</div>;
  }

  return (
    <div className="p-5">
      {isLoaded ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <StandaloneSearchBox
            onLoad={(ref) => (inputRef.current = ref)}
            onPlacesChanged={handleOnPlaceChanged}
          >
            <>
              <input
                type="text"
                placeholder="Enter area"
                {...register("address", { required: "Address is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.address && (
                <span className="text-red-500">{errors.address.message}</span>
              )}
            </>
          </StandaloneSearchBox>
          {/* Form Fields */}
          <input
            type="text"
            {...register("latitude")}
            className="w-full p-2 border rounded"
            placeholder="Latitude"
            readOnly
          />
          <input
            type="text"
            {...register("longitude")}
            className="w-full p-2 border rounded"
            placeholder="Longitude"
            readOnly
          />
          <input
            type="text"
            {...register("city")}
            className="w-full p-2 border rounded"
            placeholder="City"
          />
          <input
            type="text"
            {...register("province")}
            className="w-full p-2 border rounded"
            placeholder="Province"
          />
          <input
            type="text"
            {...register("country")}
            className="w-full p-2 border rounded"
            placeholder="Country"
          />
          <input
            type="text"
            {...register("postalCode")}
            className="w-full p-2 border rounded"
            placeholder="Postal Code"
          />
          <input
            type="text"
            {...register("district")}
            className="w-full p-2 border rounded"
            placeholder="District"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            Update Address
          </button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AddressAutoComplete;
