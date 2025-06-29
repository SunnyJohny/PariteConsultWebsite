import React, { useState, useEffect } from "react";
import { FaSearch, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Equipment = () => {
  const [projects, setProjects] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(items);
      setFilteredEquipment(items);
    });
    return unsub;
  }, []);

  const capitalizeWords = (text) =>
    text
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

  const handleSearch = (e) => {
    const v = e.target.value;
    setFilteredEquipment(
      !v.trim()
        ? projects
        : projects.filter((p) =>
            p.name.toLowerCase().includes(v.toLowerCase())
          )
    );
    setVisibleCount(6);
  };

  const handleLoadMore = () => setVisibleCount((c) => c + 6);

  const handleImageClick = (p) => {
    setSelectedEquipment(p);
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    setSelectedEquipment(null);
    document.body.classList.remove("overflow-hidden");
  };

  const handleInputChange = (e) =>
    setNewProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    if (e.target.files[0])
      setNewProject((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    const { name, description, image } = newProject;
    if (!name || !description || (!image && !editingProjectId)) {
      toast.error("All fields required");
      return;
    }

    let loadingToastId;
    try {
      loadingToastId = toast.loading("Uploading project...");

      let imageUrl = null;

      if (image && typeof image !== "string") {
        const storage = getStorage();
        const filename = `${name}-${uuidv4()}`;
        const storageRef = ref(storage, `projects/${filename}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        await new Promise((res, rej) =>
          uploadTask.on("state_changed", null, rej, () => res())
        );

        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
      }

      if (editingProjectId) {
        const docRef = doc(db, "projects", editingProjectId);
        await updateDoc(docRef, {
          name,
          description,
          ...(imageUrl && { image: imageUrl }),
        });
        toast.update(loadingToastId, {
          render: "Project updated!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        await addDoc(collection(db, "projects"), {
          name,
          description,
          image: imageUrl,
          createdAt: serverTimestamp(),
        });
        toast.update(loadingToastId, {
          render: "Project added!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }

      setNewProject({ name: "", description: "", image: null });
      setEditingProjectId(null);
      setShowAddModal(false);
    } catch (err) {
      toast.update(loadingToastId, {
        render: "Failed to upload project",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const confirmDeleteToast = (project) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="font-semibold mb-2">Delete "{project.name}"?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                deleteProject(project);
                toast.dismiss();
              }}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss()}
              className="bg-gray-300 text-black px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const deleteProject = async (project) => {
    try {
      await deleteDoc(doc(db, "projects", project.id));

      const storage = getStorage();
      const fileRef = ref(storage, project.image);
      await deleteObject(fileRef);

      toast.success("Project deleted successfully");
    } catch (error) {
      console.warn("Delete error:", error.message);
      toast.error("Failed to delete image or project.");
    }
  };

  const handleEdit = (project) => {
    setNewProject({
      name: project.name,
      description: project.description,
      image: project.image,
    });
    setEditingProjectId(project.id);
    setShowAddModal(true);
  };

  return (
    <div id="Equipment" className="p-4 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Projects Gallery</h1>
        {currentUser && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-600"
          >
            <FaPlus /> Add Project
          </button>
        )}
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-lg">
          <input
            onChange={handleSearch}
            placeholder="Search projects..."
            className="w-full p-3 pl-10 border rounded-full"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEquipment.slice(0, visibleCount).map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow-lg">
            <img
              src={p.image}
              alt={p.name}
              onClick={() => handleImageClick(p)}
              className="w-full h-48 object-cover rounded mb-2 cursor-pointer"
            />
            <h3 className="font-semibold">{capitalizeWords(p.name)}</h3>
            <p className="text-gray-600 mb-2 line-clamp-2">{p.description}</p>
            {currentUser && (
              <div className="flex gap-4 mt-3 text-xl">
                <FaEdit
                  onClick={() => handleEdit(p)}
                  className="text-blue-600 cursor-pointer hover:text-blue-800"
                />
                <FaTrash
                  onClick={() => confirmDeleteToast(p)}
                  className="text-red-600 cursor-pointer hover:text-red-800"
                />
              </div>
            )}
          </div>
        ))}
        {!filteredEquipment.length && (
          <p className="col-span-full text-center text-gray-500">
            No projects found.
          </p>
        )}
      </div>

      {visibleCount < filteredEquipment.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 border border-green-400 text-green-400 rounded-full hover:bg-green-400 hover:text-white"
          >
            Load More
          </button>
        </div>
      )}

      {selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg max-w-xl w-full relative p-4">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
            <img
              src={selectedEquipment.image}
              alt={selectedEquipment.name}
              className="w-full mb-4"
            />
            <h2 className="text-2xl font-bold">
              {capitalizeWords(selectedEquipment.name)}
            </h2>
            <p>{selectedEquipment.description}</p>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg max-w-md w-full relative p-6">
            <button
              onClick={() => {
                setShowAddModal(false);
                setEditingProjectId(null);
                setNewProject({ name: "", description: "", image: null });
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingProjectId ? "Edit Project" : "Add New Project"}
            </h2>
            <form onSubmit={handleSubmitProject} className="space-y-4">
              <input
                name="name"
                value={newProject.name}
                onChange={handleInputChange}
                placeholder="Project Name"
                className="w-full border px-3 py-2"
                required
              />
              <textarea
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full border px-3 py-2"
                rows="3"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {editingProjectId ? "Update Project" : "Save Project"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;
