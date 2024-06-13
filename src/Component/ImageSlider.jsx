import React, { useEffect, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import "./style.css";

const ImageSlider = ({ url, page, limit }) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handlePrevious = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const getImages = async (getImageURL) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${getImageURL}?limit=${limit}&page=${page}`
      );
      const data = await response.json();
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url !== "") getImages(url);
  }, [url, page, limit]);

  if (loading) return <div>Loading...</div>;

  if (errMessage !== null) return <div>{errMessage} occurred</div>;

  return (
    <div className="Carousel">
      <BsArrowLeftCircle
        className="Carousel-arrow-left"
        onClick={handlePrevious}
      />
      {images && images.length > 0 && (
        <img
          key={images[currentSlide].id}
          src={images[currentSlide].download_url}
          alt={images[currentSlide].author}
          width="300"
          height="300"
          className="Carousel-image"
        />
      )}
      <BsArrowRightCircle
        className="Carousel-arrow-right"
        onClick={handleNext}
      />
      <span>
        {images &&
          images.length > 0 &&
          images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={currentSlide === index ? "active" : ""}
            />
          ))}
      </span>
    </div>
  );
};

export default ImageSlider;
