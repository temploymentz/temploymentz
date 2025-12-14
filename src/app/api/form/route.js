import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone) =>
  /^(\+91)?[6-9]\d{9}$/.test(phone);

const sanitize = (value) => {
  if (!value) return "";
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      companyName,
      city,
      industry,
      fullName,
      mobile,
      email,
      role,
      positions,
      department,
      workType,
      workMode,
      budget,
      startDate,
      notes,
      approved,
    } = body;

    const requiredFields = {
      companyName,
      city,
      industry,
      fullName,
      mobile,
      email,
      role,
      positions,
      department,
      workType,
      workMode,
      budget,
      startDate,
    };

    for (const key in requiredFields) {
      if (!requiredFields[key]) {
        return Response.json(
          { error: `${key} is required` },
          { status: 400 }
        );
      }
    }

    if (!validateEmail(email)) {
      return Response.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!validatePhone(mobile)) {
      return Response.json(
        { error: "Invalid Indian mobile number" },
        { status: 400 }
      );
    }

    if (isNaN(positions) || positions <= 0) {
      return Response.json(
        { error: "Positions must be a positive number" },
        { status: 400 }
      );
    }

    if (isNaN(budget) || budget <= 0) {
      return Response.json(
        { error: "Budget must be a positive number" },
        { status: 400 }
      );
    }

    if (!approved) {
      return Response.json(
        { error: "Approval is required" },
        { status: 400 }
      );
    }

    const safe = {
      companyName: sanitize(companyName),
      city: sanitize(city),
      industry: sanitize(industry),
      fullName: sanitize(fullName),
      mobile: sanitize(mobile),
      email: sanitize(email),
      role: sanitize(role),
      positions: sanitize(positions),
      department: sanitize(department),
      workType: sanitize(workType),
      workMode: sanitize(workMode),
      budget: sanitize(budget),
      startDate: sanitize(startDate),
      notes: sanitize(notes || "No additional notes"),
      approved: "Yes"
    };

    const htmlTemplate = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Company Info</h2>
        <p><strong>Company:</strong> ${safe.companyName}</p>
        <p><strong>City:</strong> ${safe.city}</p>
        <p><strong>Industry:</strong> ${safe.industry}</p>

        <h2>Contact Person</h2>
        <p><strong>Name:</strong> ${safe.fullName}</p>
        <p><strong>Phone:</strong> ${safe.mobile}</p>
        <p><strong>Email:</strong> ${safe.email}</p>

        <h2>Requirement Details</h2>
        <p><strong>Role:</strong> ${safe.role}</p>
        <p><strong>Positions:</strong> ${safe.positions}</p>
        <p><strong>Department:</strong> ${safe.department}</p>
        <p><strong>Work Type:</strong> ${safe.workType}</p>
        <p><strong>Work Mode:</strong> ${safe.workMode}</p>

        <h2>Budget & Start Date</h2>
        <p><strong>Budget/Day:</strong> ₹${safe.budget}</p>
        <p><strong>Start Date:</strong> ${safe.startDate}</p>

        <h2>Notes</h2>
        <p>${safe.notes}</p>

        <h2>Confirmation</h2>
        <p><strong>Approved:</strong> Yes</p>
      </div>
    `;


    const sent = await resend.emails.send({
      from: "no-reply@temploymentz.com",
      to: "temploymentz4u@gmail.com",
      subject: "New Registration Form Submitted",
      html: htmlTemplate,
    });

    if (!sent || sent.error) {
      return Response.json(
        { error: "Email sending failed", details: sent.error },
        { status: 500 }
      );
    }


    return Response.json(
      { success: true, message: "Form submitted successfully!" },
      { status: 200 }
    );

  } catch (err) {
    console.log("API Error:", err);
    return Response.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
