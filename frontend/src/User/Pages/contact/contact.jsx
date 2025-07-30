import React, { useState, useCallback } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const validateForm = useCallback(() => {
    let formErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.mobile.trim()) {
      formErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      formErrors.mobile = "Mobile number must be 10 digits";
      isValid = false;
    }

    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      formErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.message.trim()) {
      formErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:2025/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", mobile: "", email: "", message: "" });
        setErrors({});
      } else {
        alert(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold">Name</label>
            <input
              id="name"
              className={`border p-2 ${errors.name ? "border-red-800" : "border-gray-300"}`}
              placeholder="Enter your name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-800 text-sm">{errors.name}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="mobile" className="font-semibold">Mobile No.</label>
            <input
              id="mobile"
              className={`border p-2 ${errors.mobile ? "border-red-800" : "border-gray-300"}`}
              placeholder="Enter mobile number"
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <p className="text-red-800 text-sm">{errors.mobile}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              id="email"
              className={`border p-2 ${errors.email ? "border-red-800" : "border-gray-300"}`}
              placeholder="Enter your email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-800 text-sm">{errors.email}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="font-semibold">Message</label>
            <textarea
              id="message"
              className={`border p-2 h-32 ${errors.message ? "border-red-800" : "border-gray-300"}`}
              placeholder="Enter your message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p className="text-red-800 text-sm">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-green-800 text-white px-4 py-2 rounded disabled:bg-gray-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div>
          <div className="mb-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-green-800 h-6 w-1 mr-2"></span>
              INDIA HEAD OFFICE
            </h2>
             <p className="mb-2 font-semibold">Aurinko One Health Private Limited</p>
            <p className="mb-2">
              <i className="fas fa-map-marker-alt text-green-700"></i> Plot: 1, Mirzapur, Sec-74, Mirzapur Mor, Ballabhgarh, Faridabad, Haryana-121004
            </p>
            <p className="mb-2">
              <i className="fas fa-envelope text-green-700"></i> info@aurinkohealthcare.com
            </p>
            <p>
              <i className="fas fa-phone text-green-700"></i> 01296662200
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-green-800 h-6 w-1 mr-2"></span>
                ZIMBABWE
              </h2>
              <p className="mb-2 font-semibold">
                Aurinko One Health Zimbabwe Private Limited
              </p>
              <p className="mb-2">
                <i className="fas fa-map-marker-alt text-green-700"></i> Unit 10, 248 Williams Way, MASA , Harare, Zimbabwe
              </p>
              <p className="mb-2">
                <i className="fas fa-envelope text-green-700"></i>  Drabhay@aurinkohealthcare.com
              </p>
              <p>
                <i className="fas fa-phone text-green-700"></i> +263772235379 (Gorge Rundogo)
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-green-800 h-6 w-1 mr-2"></span>
                KOREA
              </h2>
              <p className="mb-2 font-semibold">
                Aurinko One Health Korea Private Limited
              </p>
              <p className="mb-2">
                <i className="fas fa-map-marker-alt text-green-700"></i> 1622 Suite, U1 center, 385 bungil 25, jomaruro, Buchuncity, Gyunggido, Korea
              </p>
              <p className="mb-2">
                <i className="fas fa-envelope text-green-700"></i> info@aurinkohealthcare.com
              </p>
              <p>
                <i className="fas fa-phone text-green-700"></i> +82 10 5277 8200 (Youngsun Yoo)
              </p>
            </div>
          </div>
        </div>

      </div>
      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.2936394417075!2d77.34505539999999!3d28.3499707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdb9766d62aab%3A0x499dcf82d3074077!2sAurinko%20Healthcare%20Private%20Limited!5e0!3m2!1sen!2sin!4v1741677068894!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
