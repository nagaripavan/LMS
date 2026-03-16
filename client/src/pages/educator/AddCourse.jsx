import React, { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);

  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  // CHAPTER FUNCTIONS
  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter chapter name:");

      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0
              ? chapters[chapters.length - 1].chapterOrder + 1
              : 1,
        };

        setChapters([...chapters, newChapter]);
      }
    }

    else if (action === "remove") {
      setChapters(chapters.filter((ch) => ch.chapterId !== chapterId));
    }

    else if (action === "toggle") {
      setChapters(
        chapters.map((ch) =>
          ch.chapterId === chapterId
            ? { ...ch, collapsed: !ch.collapsed }
            : ch
        )
      );
    }
  };

  // LECTURE FUNCTIONS
  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    }

    else if (action === "remove") {
      setChapters(
        chapters.map((ch) => {
          if (ch.chapterId === chapterId) {
            return {
              ...ch,
              chapterContent: ch.chapterContent.filter(
                (_, index) => index !== lectureIndex
              ),
            };
          }
          return ch;
        })
      );
    }
  };

  // ADD LECTURE
  const addLecture = () => {
    setChapters(
      chapters.map((ch) => {
        if (ch.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureId: uniqid(),
            lectureOrder:
              ch.chapterContent.length > 0
                ? ch.chapterContent[ch.chapterContent.length - 1]
                    .lectureOrder + 1
                : 1,
          };

          return {
            ...ch,
            chapterContent: [...ch.chapterContent, newLecture],
          };
        }

        return ch;
      })
    );

    setShowPopup(false);

    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      courseTitle,
      coursePrice,
      discount,
      image,
      chapters,
    });
  };

  // QUILL EDITOR
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="h-screen flex flex-col items-start md:p-8 p-4 overflow-scroll">
      <form onSubmit={handleSubmit}>

        {/* COURSE TITLE */}
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <input
            type="text"
            placeholder="Type here"
            className="outline-none py-2 px-3 rounded border border-gray-500"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
        </div>

        {/* COURSE DESCRIPTION */}
        <div className="my-2">
          <p>Course Description</p>
          <div ref={editorRef} className="h-40 mb-4"></div>
        </div>

        {/* PRICE */}
        <div className="flex items-center justify-between flex-wrap">

          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              type="number"
              className="outline-none py-2 px-3 w-28 rounded border border-gray-500"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              required
            />
          </div>

          {/* IMAGE */}
          <div className="flex items-center gap-3">
            <p>Course Thumbnail</p>

            <label htmlFor="thumbnailImage" className="flex items-center gap-3">

              <img
                src={assets.file_upload_icon}
                alt=""
                className="p-3 bg-blue-500 rounded cursor-pointer"
              />

              <input
                type="file"
                hidden
                id="thumbnailImage"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="max-h-10"
                  alt=""
                />
              )}

            </label>
          </div>

        </div>

        {/* DISCOUNT */}
        <div className="my-2">
          <p>Discount %</p>
          <input
            type="number"
            min={0}
            max={100}
            className="outline-none py-2 px-3 w-28 rounded border border-gray-500"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        {/* CHAPTER SECTION */}
        <div>

          {chapters.map((chapter, chapterIndex) => (

            <div key={chapter.chapterId} className="bg-white border rounded-lg mb-4">

              <div className="flex justify-between items-center p-4 border-b">

                <div className="flex items-center">

                  <img
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                  />

                  <span className="font-semibold">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>

                </div>

                <span className="text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>

                <img
                  src={assets.cross_icon}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                />

              </div>

              {!chapter.collapsed && (
                <div className="p-4">

                  {chapter.chapterContent.map((lecture, lectureIndex) => (

                    <div key={lecture.lectureId} className="flex justify-between mb-2">

                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>

                      <img
                        src={assets.cross_icon}
                        className="cursor-pointer"
                        onClick={() =>
                          handleLecture(
                            "remove",
                            chapter.chapterId,
                            lectureIndex
                          )
                        }
                        alt=""
                      />

                    </div>

                  ))}

                  <div
                    className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                    onClick={() => handleLecture("add", chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>

                </div>
              )}
            </div>
          ))}

          <div
            className="flex justify-center bg-blue-100 p-2 rounded-lg cursor-pointer my-4"
            onClick={() => handleChapter("add")}
          >
            + Add Chapter
          </div>

        </div>

        {/* POPUP */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">

            <div className="bg-white p-4 rounded w-full max-w-80 relative">

              <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>

              <input
                placeholder="Lecture Title"
                className="border w-full p-2 mb-2"
                value={lectureDetails.lectureTitle}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureTitle: e.target.value,
                  })
                }
              />

              <input
                placeholder="Duration"
                className="border w-full p-2 mb-2"
                value={lectureDetails.lectureDuration}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureDuration: e.target.value,
                  })
                }
              />

              <input
                placeholder="Lecture URL"
                className="border w-full p-2 mb-2"
                value={lectureDetails.lectureUrl}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureUrl: e.target.value,
                  })
                }
              />

              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      isPreviewFree: e.target.checked,
                    })
                  }
                />
                Free Preview
              </label>

              <button
                type="button"
                onClick={addLecture}
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                Add
              </button>

              <img
                src={assets.cross_icon}
                alt=""
                className="absolute top-3 right-3 w-4 cursor-pointer"
                onClick={() => setShowPopup(false)}
              />

            </div>

          </div>
        )}

        <button
          type="submit"
          className="bg-black text-white px-8 py-2.5 rounded my-4"
        >
          Add Course
        </button>

      </form>
    </div>
  );
};

export default AddCourse;