// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ProductContext } from "./../contexts/ProductContext";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import productSchame from "./../pages/schemaValid/productSchema";
// import api from "../axios/indext";

// const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;
// const ProductForm = () => {
//   const { id } = useParams();
//   const { dispatch } = useContext(ProductContext);
//   const nav = useNavigate();
//   const [thumbnailUrl, setThumbnailUrl] = useState(null);

//   //State để lưu trữ lựa chọn của người dùng
//   const [thumbnailOption, setThumbnailOption] = useState("keep");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(productSchame),
//   });

//   useEffect(() => {
//     if (id) {
//       (async () => {
//         const { data } = await api.get(`/products/${id}`);
//         console.log(data);
//         reset(data);
//         setThumbnailUrl(data.thumbnail);
//       })();
//     }
//   }, [id, reset]);

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", VITE_UPLOAD_PRESET);

//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     return data.secure_url;
//   };

//   const onSubmit = async (product) => {
//     try {
//       let updatedProduct = { ...product };
//       // Kiểm tra lựa chọn của admin và xử lý tương ứng
//       switch (thumbnailOption) {
//         case "upload":
//           // Xử lý upload ảnh nếu admin chọn upload từ local
//           if (product.thumbnail && product.thumbnail[0]) {
//             const thumbnailUrl = await uploadImage(product.thumbnail[0]);
//             updatedProduct = { ...updatedProduct, thumbnail: thumbnailUrl };
//           }
//           break;
//         default:
//         // Giữ nguyên ảnh cũ khi không thay đổi
//         // Hoặc mặc định khi người dùng chọn "link ảnh online"
//         // Tôi sử dụng switch case để dễ mở rộng cho các tình huống trong tương lai
//       }
//       if (id) {
//         const { data } = await api.patch(`/products/${id}`, updatedProduct);
//         dispatch({
//           type: "UPDATE_PRODUCT",
//           payload: { id, product: updatedProduct },
//         });
//         console.log(data);
//       } else {
//         const { data } = await api.post("/products", updatedProduct);
//         dispatch({ type: "ADD_PRODUCT", payload: data });
//         console.log(data);
//       }
//       nav("/admin");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <h1>{id ? "Edit" : "Add"} product</h1>
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">
//             Title
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="title"
//             {...register("title", { required: true })}
//           />
//           {errors.title?.message && (
//             <p className="text-danger">{errors.title?.message}</p>
//           )}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="price" className="form-label">
//             price
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             id="price"
//             {...register("price", { required: true, valueAsNumber: true })}
//           />
//           {errors.price?.message && (
//             <p className="text-danger">{errors.price?.message}</p>
//           )}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">
//             description
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="description"
//             {...register("description", { required: true })}
//           />
//           {errors.description?.message && (
//             <p className="text-danger">{errors.description?.message}</p>
//           )}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="thumbnailOption" className="form-label">
//             Choose Thumbnail Option
//           </label>
//           <select
//             className="form-control"
//             id="thumbnailOption"
//             value={thumbnailOption}
//             onChange={(e) => setThumbnailOption(e.target.value)}
//           >
//             <option value="keep">Keep Current Thumbnail</option>
//             <option value="link">Add Thumbnail from Link</option>
//             <option value="upload">Upload Thumbnail from Local</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label htmlFor="thumnail" className="form-label">
//             Thumbnail
//           </label>
//           {thumbnailOption === "link" && (
//             <input
//               type="text"
//               className="form-control"
//               id="thumbnail"
//               {...register("thumbnail")}
//             />
//           )}

//           {thumbnailOption === "upload" && (
//             <input
//               type="file"
//               className="form-control"
//               id="thumbnail"
//               {...register("thumbnail", { required: true })}
//             />
//           )}

//           {errors.thumbnail?.message && (
//             <p className="text-danger">{errors.thumbnail?.message}</p>
//           )}

//           {thumbnailUrl && (
//             <img
//               src={thumbnailUrl}
//               alt="Product Thumbnail"
//               style={{ maxWidth: "200px", marginTop: "10px" }}
//             />
//           )}
//         </div>

//         <div className="mb-3">
//           <button className="btn btn-primary w-100" type="submit">
//             {id ? "Edit" : "Add"} product
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../axios/indext";

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;
import productSchame from "./../pages/schemaValid/productSchema";

const ProductForm = () => {
  const { id } = useParams();
  const { dispatch } = useContext(ProductContext);
  const nav = useNavigate();
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  // State để lưu trữ lựa chọn của người dùng
  const [thumbnailOption, setThumbnailOption] = useState("keep");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchame),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await api.get(`/products/${id}`);
        console.log(data);
        reset(data);
        setThumbnailUrl(data.thumbnail);
      })();
    }
  }, [id, reset]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    return data.secure_url;
  };

  const onSubmit = async (product) => {
    try {
      let updatedProduct = { ...product };
      // Kiểm tra lựa chọn của admin và xử lý tương ứng
      switch (thumbnailOption) {
        case "upload":
          // Xử lý upload ảnh nếu admin chọn upload từ local
          if (product.thumbnail && product.thumbnail[0]) {
            const thumbnailUrl = await uploadImage(product.thumbnail[0]);
            updatedProduct = { ...updatedProduct, thumbnail: thumbnailUrl };
          }
          break;
        default:
        // Giữ nguyên ảnh cũ khi không thay đổi
        // Hoặc mặc định khi người dùng chọn "link ảnh online"
        // Tôi sử dụng switch case để dễ mở rộng cho các tình huống trong tương lai
      }

      if (id) {
        const { data } = await api.patch(`/products/${id}`, updatedProduct);
        dispatch({
          type: "UPDATE_PRODUCT",
          payload: { id, product: updatedProduct },
        });
        console.log(data);
      } else {
        const { data } = await api.post("/products", updatedProduct);
        dispatch({ type: "ADD_PRODUCT", payload: data });
        console.log(data);
      }

      nav("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{id ? "Edit" : "Add"} product</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title", { required: true })}
          />
          {errors.title?.message && (
            <p className="text-danger">{errors.title?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-danger">{errors.price?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-danger">{errors.description?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnailOption" className="form-label">
            Choose Thumbnail Option
          </label>
          <select
            className="form-control"
            id="thumbnailOption"
            value={thumbnailOption}
            onChange={(e) => setThumbnailOption(e.target.value)}
          >
            <option value="keep">Keep Current Thumbnail</option>
            <option value="link">Add Thumbnail from Link</option>
            <option value="upload">Upload Thumbnail from Local</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail
          </label>
          {thumbnailOption === "link" && (
            <input
              type="text"
              className="form-control"
              id="thumbnail"
              {...register("thumbnail")}
            />
          )}
          {thumbnailOption === "upload" && (
            <input
              type="file"
              className="form-control"
              id="thumbnail"
              {...register("thumbnail", { required: true })}
            />
          )}
          {errors.thumbnail?.message && (
            <p className="text-danger">{errors.thumbnail?.message}</p>
          )}
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Product Thumbnail"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-primary w-100" type="submit">
            {id ? "Edit" : "Add"} product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
