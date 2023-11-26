import { useState } from "react";
import Summary from "./Summary";

const Upload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    handleFileChange(event, true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleFiles = (file) => {
    if (file) {
      console.log("File name:", file.name);
      console.log("File size:", file.size, "bytes");
    }
    // You can perform further operations with the file, such as uploading or displaying its content.
  };

  const styles = {
    dropZone: {
      border: `2px dashed ${isDragOver ? "#2196F3" : "#ccc"}`,
      borderRadius: "8px",
      padding: "20px",
      textAlign: "center",
      background: "transparent",
      color: isDragOver ? "white" : "initial",
      boxShadow: isDragOver ? "0 0 10px rgba(255, 255, 255, 0.7)" : "none",
      transition:
        "background 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    },
  };

  // file upload progress and submit
  const handleFileChange = (event, dropped = false) => {
    let file;
    if (dropped) {
      file = event.dataTransfer.files[0];
    } else {
      file = event.target.files[0];
    }
    handleFiles(file);
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    setLoading(true);
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgress(percentComplete.toFixed(2));
      }
    };

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            const jsonResponse = JSON.parse(xhr.responseText);
            // console.log(jsonResponse);
            setData(jsonResponse); // Adjust the property based on your server's response
            setToggle(true);
            setLoading(false);
          } catch (error) {
            console.error("Error parsing JSON response:", error);
            setLoading(false);
            alert("Error 500. " + error);
          }
        } else {
          setLoading(false);
          alert("File upload failed.");
        }
        setProgress(0);
      }
    };

    xhr.open("POST", "https://snapcv.onrender.com/upload", true);
    xhr.send(formData);
  };

  return (
    <>
      {!loading ? (
        !toggle ? (
          <form className="upload" encType="multipart/form-data">
            <div
              className="upload-body"
              style={styles.dropZone}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="radiate_container">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
              <p>Drag pdf to upload , or</p>
              <label htmlFor="inp">Choose File</label>
              <input
                id="inp"
                type="file"
                name="file"
                onChange={handleFileChange}
              />

              <div
                style={{
                  width: `${progress}%`,
                  background: "#4CAF50",
                  height: "5px",
                  position: "absolute",
                  bottom: "0",
                  borderRadius: "0.35rem",
                }}
              ></div>
            </div>
          </form>
        ) : (
          <Summary toggle={setToggle} data={data} />
        )
      ) : (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default Upload;
