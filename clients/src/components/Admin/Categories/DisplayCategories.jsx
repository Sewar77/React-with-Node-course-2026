import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";
import Header from "../../Layout/Header.jsx";

function DisplayCategories() {
  const [categories, setCategories] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({});

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      console.log("res categories:", res);
      //check if there is no categories
      if (res.data.categories.length === 0) {
        toast.error(res.data.message || "No categories found");
        return;
      }
      setCategories(res.data.categories);
    } catch (err) {
      toast.error("Failed to fetch categories");
      console.log(err);
    }
  };

  const handleSaveEdit = async (categoryId) => {
    try {
      const res = await api.put(
        `/admin/categories/${categoryId}`,
        editedCategory
      );
      if (res.status === 200) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === categoryId ? { ...cat, ...editedCategory } : cat
          )
        );
        toast.success(res.data.message || "updated well");
        setEditingId(null);
        fetchCategories();
      }
    } catch (err) {
      toast.error("Failed to update categories");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Header />
      <h3>Categories</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            const isEditing = editingId === category._id;
            return (
              <tr key={category._id}>
                <td>{index + 1}</td>

                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedCategory.name}
                      onChange={(e) =>
                        setEditedCategory({
                          ...editedCategory,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    category.name
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedCategory.description}
                      onChange={(e) =>
                        setEditedCategory({
                          ...editedCategory,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    category.description || "no description"
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <>
                      <button onClick={() => handleSaveEdit(category._id)}>
                        Save
                      </button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(category._id);
                        setEditedCategory({
                          name: category.name,
                          description: category.description,
                        });
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default DisplayCategories;
