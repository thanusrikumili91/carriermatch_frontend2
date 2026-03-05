```tsx
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Building2, ExternalLink, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  link: string;
}

// Large city list (like country dropdown)
const CITIES = [
  "Hyderabad",
  "Bangalore",
  "Chennai",
  "Mumbai",
  "Pune",
  "Delhi",
  "Noida",
  "Gurgaon",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Visakhapatnam",
  "Vijayawada",
  "Coimbatore",
  "Kochi",
  "Trivandrum",
  "Chandigarh",
  "Indore",
  "Bhopal",
  "Nagpur",
  "Surat",
  "Lucknow",
  "Patna",
  "Bhubaneswar",
  "Madurai",
  "Mysore",
  "Raipur",
  "Dehradun"
];

// ------------------------------
// Static fallback jobs per role
// ---------------------------
```
