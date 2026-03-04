const handleSubmit = async () => {
  if (!file) return;
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:7860/analyze", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(`Backend Error: ${response.status}`);
    const data = await response.json();

    // Navigate to Mapping page with backend data
    navigate("/mapping", { state: { resumeData: data } });
  } catch (error: any) {
    console.error(error);
    alert(error.message || "Failed to analyze resume.");
  } finally {
    setLoading(false);
  }
};
