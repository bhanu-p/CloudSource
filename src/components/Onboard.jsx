
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Onboard = () => {
  const navigate = useNavigate();
  const currentMobile = localStorage.getItem("currentUserMobile");

  const [step, setStep] = useState(1);
  const [qualification, setQualification] = useState("");
  const [interDiploma, setInterDiploma] = useState("");

  const [markTypes, setMarkTypes] = useState({
    tenth: "percentage",
    intermediate: "percentage",
    diploma: "percentage",
    graduation: "percentage",
    postgraduation: "percentage",
    phd: "percentage",
  });

  const [eduDetails, setEduDetails] = useState({
    name: "",
    parentName: "",
    tenth: { school: "", marks: "", year: "" },
    intermediate: { college: "", marks: "", year: "" },
    diploma: { college: "", marks: "", year: "" },
    graduation: { college: "", degree: "", marks: "", year: "" },
    postgraduation: { college: "", degree: "", marks: "", year: "" },
    phd: { college: "", degree: "", marks: "", year: "" },
  });

  const [bankDetails, setBankDetails] = useState({
    accNumber: "",
    ifsc: "",
    bankName: "",
    branch: "",
  });

  const [errors, setErrors] = useState({});

  // === Here is the **same localStorage logic from 1st code** as you requested ===
  useEffect(() => {

    const existingDataString = localStorage.getItem(`onboardData_${currentMobile}`);
    if (existingDataString) {
      try {
        const existingData = JSON.parse(existingDataString);

        // Deep check for empty strings in nested data
        const hasEmptyValues = (obj) => {
          if (typeof obj === "string") return obj.trim() === "";
          if (typeof obj === "object" && obj !== null) {
            return Object.values(obj).some(hasEmptyValues);
          }
          return false;
        };

        if (!hasEmptyValues(existingData)) {
          navigate("/dashboard");
        }
      } catch (err) {
        // JSON parse error - do nothing, show form
      }
    }
  }, [navigate]);
  // === End of localStorage logic ===

  const isAlpha = (val) => /^[A-Za-z ]+$/.test(val.trim());
  const isNumeric = (val) => /^[0-9]+(\.[0-9]+)?$/.test(val.trim());
  const isValidYear = (val) =>
    /^\d{4}$/.test(val.trim()) &&
    +val >= 1900 &&
    +val <= new Date().getFullYear();
  const isValidIfsc = (val) => /^[A-Za-z]{4}[0-9]{7}$/.test(val.trim());

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const handleEduChange = (e) => {
    const { name, value } = e.target;
    setEduDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedEduChange = (section, field, value) => {
    setEduDetails((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const renderMarkTypeDropdown = (section) => (
    <label>
      {capitalize(section)} Marks Type:
      <select
        value={markTypes[section]}
        onChange={(e) =>
          setMarkTypes((prev) => ({ ...prev, [section]: e.target.value }))
        }
      >
        <option value="percentage">Percentage</option>
        <option value="cgpa">CGPA</option>
      </select>
    </label>
  );

  const validateEduSection = (section, isDegree = false) => {
    const e = {};
    const data = eduDetails[section];

    if (section === "tenth") {
      if (!data.school?.trim()) e.tenthSchool = "10th school name is required.";
    } else {
      if (!data.college?.trim()) e[`${section}College`] = "College name required.";
    }

    if (isDegree && !data.degree?.trim())
      e[`${section}Degree`] = "Degree required.";

    if (!data.marks?.trim() || !isNumeric(data.marks)) {
      e[`${section}Marks`] = "Enter valid marks.";
    } else {
      const val = parseFloat(data.marks);
      const type = markTypes[section];
      if (type === "percentage" && (val < 0 || val > 100))
        e[`${section}Marks`] = "Percentage must be 0-100";
      if (type === "cgpa" && (val < 0 || val > 10))
        e[`${section}Marks`] = "CGPA must be 0-10";
    }

    if (!data.year?.trim() || !isValidYear(data.year)) {
      e[`${section}Year`] = "Enter valid year.";
    }

    return e;
  };

  const validateStep1 = () => {
    let e = {};
    if (!eduDetails.name.trim() || !isAlpha(eduDetails.name))
      e.name = "Enter a valid name.";
    if (!eduDetails.parentName.trim() || !isAlpha(eduDetails.parentName))
      e.parentName = "Enter a valid parent's name.";
    if (!qualification) e.qualification = "Select highest qualification.";

    e = { ...e, ...validateEduSection("tenth") };

    if (qualification === "intermediate")
      e = { ...e, ...validateEduSection("intermediate") };
    if (qualification === "diploma")
      e = { ...e, ...validateEduSection("diploma") };

    if (["graduation", "postgraduation", "phd"].includes(qualification)) {
      if (!interDiploma) e.interDiploma = "Select intermediate or diploma.";
      else e = { ...e, ...validateEduSection(interDiploma) };
      e = { ...e, ...validateEduSection("graduation", true) };
    }

    if (["postgraduation", "phd"].includes(qualification)) {
      e = { ...e, ...validateEduSection("postgraduation", true) };
    }

    if (qualification === "phd") {
      e = { ...e, ...validateEduSection("phd", true) };
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (
      !bankDetails.accNumber.trim() ||
      !/^\d{9,18}$/.test(bankDetails.accNumber)
    )
      e.accNumber = "Invalid account number.";
    if (!bankDetails.ifsc.trim() || !isValidIfsc(bankDetails.ifsc))
      e.ifsc = "Invalid IFSC.";
    if (!bankDetails.bankName.trim() || !isAlpha(bankDetails.bankName))
      e.bankName = "Enter a valid bank name.";
    if (!bankDetails.branch.trim()) e.branch = "Branch required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {

      // Save data as per your original storage logic (no new variables added)
      localStorage.setItem(
        `onboardData_${currentMobile}`,
        JSON.stringify({ eduDetails, bankDetails, qualification, interDiploma, markTypes })
      );

      navigate("/dashboard");
    }
  };

  const renderEduSection = (key) => {
    const isDegree = ["graduation", "postgraduation", "phd"].includes(key);
    const label = capitalize(key);
    return (
      <div className="edu-section" key={key}>
        <h4>{label} Details</h4>
        {key === "tenth" ? (
          <>
            <input
              type="text"
              placeholder="10th School Name"
              value={eduDetails[key].school}
              onChange={(e) => handleNestedEduChange(key, "school", e.target.value)}
            />
            {errors.tenthSchool && <div className="error">{errors.tenthSchool}</div>}
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder={`${label} College Name`}
              value={eduDetails[key].college}
              onChange={(e) => handleNestedEduChange(key, "college", e.target.value)}
            />
            {errors[`${key}College`] && (
              <div className="error">{errors[`${key}College`]}</div>
            )}
          </>
        )}

        {isDegree && (
          <>
            <input
              type="text"
              placeholder={`${label} Degree`}
              value={eduDetails[key].degree}
              onChange={(e) => handleNestedEduChange(key, "degree", e.target.value)}
            />
            {errors[`${key}Degree`] && (
              <div className="error">{errors[`${key}Degree`]}</div>
            )}
          </>
        )}

        {renderMarkTypeDropdown(key)}

        <input
          type="text"
          placeholder={`${label} Marks`}
          value={eduDetails[key].marks}
          onChange={(e) => handleNestedEduChange(key, "marks", e.target.value)}
        />
        {errors[`${key}Marks`] && <div className="error">{errors[`${key}Marks`]}</div>}

        <input
          type="text"
          placeholder={`${label} Year`}
          value={eduDetails[key].year}
          onChange={(e) => handleNestedEduChange(key, "year", e.target.value)}
        />
        {errors[`${key}Year`] && <div className="error">{errors[`${key}Year`]}</div>}
      </div>
    );
  };

  return (
    <div className="onboard-container">
      <h2>Onboarding</h2>
      {step === 1 && (
        <div className="form-section">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={eduDetails.name}
            onChange={handleEduChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}

          <input
            type="text"
            name="parentName"
            placeholder="Parent's Name"
            value={eduDetails.parentName}
            onChange={handleEduChange}
          />
          {errors.parentName && <div className="error">{errors.parentName}</div>}

          <label>
            Highest Qualification:
            <select
              value={qualification}
              onChange={(e) => {
                setQualification(e.target.value);
                setInterDiploma("");
              }}
            >
              <option value="">Select</option>
              <option value="intermediate">Intermediate</option>
              <option value="diploma">Diploma</option>
              <option value="graduation">Graduation</option>
              <option value="postgraduation">Postgraduation</option>
              <option value="phd">PhD</option>
            </select>
          </label>
          {errors.qualification && <div className="error">{errors.qualification}</div>}

          {["graduation", "postgraduation", "phd"].includes(qualification) && (
            <label>
              Intermediate or Diploma:
              <select value={interDiploma} onChange={(e) => setInterDiploma(e.target.value)}>
                <option value="">Select</option>
                <option value="intermediate">Intermediate</option>
                <option value="diploma">Diploma</option>
              </select>
            </label>
          )}
          {errors.interDiploma && <div className="error">{errors.interDiploma}</div>}

          {renderEduSection("tenth")}
          {qualification === "intermediate" && renderEduSection("intermediate")}
          {qualification === "diploma" && renderEduSection("diploma")}
          {["graduation", "postgraduation", "phd"].includes(qualification) &&
            interDiploma &&
            renderEduSection(interDiploma)}
          {["graduation", "postgraduation", "phd"].includes(qualification) &&
            renderEduSection("graduation")}
          {["postgraduation", "phd"].includes(qualification) && renderEduSection("postgraduation")}
          {qualification === "phd" && renderEduSection("phd")}

          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-section">
          <h3>Bank Details</h3>
          <input
            name="accNumber"
            placeholder="Account Number"
            value={bankDetails.accNumber}
            onChange={handleBankChange}
          />
          {errors.accNumber && <div className="error">{errors.accNumber}</div>}

          <input
            name="ifsc"
            placeholder="IFSC Code"
            value={bankDetails.ifsc}
            onChange={handleBankChange}
          />
          {errors.ifsc && <div className="error">{errors.ifsc}</div>}

          <input
            name="bankName"
            placeholder="Bank Name"
            value={bankDetails.bankName}
            onChange={handleBankChange}
          />
          {errors.bankName && <div className="error">{errors.bankName}</div>}

          <input
            name="branch"
            placeholder="Branch"
            value={bankDetails.branch}
            onChange={handleBankChange}
          />
          {errors.branch && <div className="error">{errors.branch}</div>}

          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Onboard;
