// src/pages/SgpaCalculator.jsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";

// =================================================================
//  1. SGPA Calculator Component (No Changes)
// =================================================================
const SgpaCalculator = () => {
  const [courses, setCourses] = useState([{ credits: "", grade: "" }]);
  const [sgpa, setSgpa] = useState(null);
  const gradePoints = { O: 10, "A+": 9, A: 8, "B+": 7, B: 6, C: 5, P: 4, F: 0 };

  const handleCourseChange = (index, event) => {
    const values = [...courses];
    values[index][event.target.name] = event.target.value.toUpperCase();
    setCourses(values);
  };
  const addCourse = () => setCourses([...courses, { credits: "", grade: "" }]);
  const removeCourse = (index) =>
    setCourses(courses.filter((_, i) => i !== index));

  const calculateSgpa = () => {
    let totalCredits = 0,
      weightedGradePoints = 0,
      valid = true;
    courses.forEach((course) => {
      const credits = parseFloat(course.credits);
      const grade = course.grade.trim();
      if (
        isNaN(credits) ||
        credits <= 0 ||
        !gradePoints.hasOwnProperty(grade)
      ) {
        valid = false;
        return;
      }
      totalCredits += credits;
      weightedGradePoints += credits * gradePoints[grade];
    });
    setSgpa(
      valid && totalCredits > 0
        ? (weightedGradePoints / totalCredits).toFixed(2)
        : "Invalid Input"
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SGPA Calculator</CardTitle>
        <CardDescription>
          Enter course credits and grades to find your SGPA for one semester.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                name="credits"
                placeholder="Credits"
                value={course.credits}
                onChange={(e) => handleCourseChange(index, e)}
                type="number"
                className="w-1/3"
              />
              <Input
                name="grade"
                placeholder="Grade (e.g., A+)"
                value={course.grade}
                onChange={(e) => handleCourseChange(index, e)}
                className="w-1/3"
              />
              {courses.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCourse(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={addCourse} variant="outline">
            Add Course
          </Button>
          <Button onClick={calculateSgpa}>Calculate SGPA</Button>
        </div>
        {sgpa !== null && (
          <div className="mt-6 text-center bg-muted p-4 rounded-lg">
            {sgpa === "Invalid Input" ? (
              <p className="text-destructive font-bold">Invalid Input</p>
            ) : (
              <>
                <h3 className="text-lg font-semibold">Your SGPA is:</h3>
                <p className="text-4xl font-bold text-primary">{sgpa}</p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// =================================================================
//  2. CGPA Calculator Component (NEW)
// =================================================================
const CgpaCalculator = () => {
  const [semesters, setSemesters] = useState([{ sgpa: "" }]);
  const [cgpa, setCgpa] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [error, setError] = useState("");

  const handleSemesterChange = (index, event) => {
    const values = [...semesters];
    values[index].sgpa = event.target.value;
    setSemesters(values);
  };
  const addSemester = () => setSemesters([...semesters, { sgpa: "" }]);
  const removeSemester = (index) =>
    setSemesters(semesters.filter((_, i) => i !== index));

  const calculateCgpa = () => {
    setError("");
    setCgpa(null);
    setPercentage(null);

    let totalSgpa = 0;
    let validSgpaCount = 0;

    for (const sem of semesters) {
      const sgpaValue = parseFloat(sem.sgpa);
      if (isNaN(sgpaValue) || sgpaValue < 0 || sgpaValue > 10) {
        setError(
          `Invalid SGPA value detected. Please enter numbers between 0 and 10.`
        );
        return;
      }
      totalSgpa += sgpaValue;
      validSgpaCount++;
    }

    if (validSgpaCount === 0) {
      setError("Please enter SGPA for at least one semester.");
      return;
    }

    const finalCgpa = totalSgpa / validSgpaCount;
    const finalPercentage = finalCgpa * 9.5;

    setCgpa(finalCgpa.toFixed(2));
    setPercentage(finalPercentage.toFixed(2));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CGPA & Percentage Calculator</CardTitle>
        <CardDescription>
          Enter the SGPA for each semester to calculate your overall CGPA.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {semesters.map((sem, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder={`Semester ${index + 1} SGPA`}
                value={sem.sgpa}
                onChange={(e) => handleSemesterChange(index, e)}
              />
              {semesters.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSemester(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={addSemester} variant="outline">
            Add Semester
          </Button>
          <Button onClick={calculateCgpa}>Calculate CGPA</Button>
        </div>
        {error && (
          <div className="mt-6 text-center bg-destructive/10 text-destructive p-3 rounded-lg">
            <p className="font-semibold">{error}</p>
          </div>
        )}
        {cgpa !== null && (
          <div className="mt-6">
            <Card className="bg-muted">
              <CardHeader>
                <CardTitle>Final Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                  <div className="p-4 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Your CGPA
                    </h3>
                    <p className="text-5xl font-bold text-primary">{cgpa}</p>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Overall Percentage
                    </h3>
                    <p className="text-5xl font-bold text-primary">
                      {percentage}%
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full">
                  *Percentage is calculated using the formula: CGPA * 9.5. This
                  is a common standard but may vary.
                </p>
              </CardFooter>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// =================================================================
//  3. Marks Percentage Calculator Component (No Changes)
// =================================================================
const PercentageCalculator = () => {
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [error, setError] = useState("");

  const calculatePercentage = () => {
    setError("");
    setPercentage(null);
    const obtained = parseFloat(obtainedMarks);
    const total = parseFloat(totalMarks);
    if (isNaN(obtained) || isNaN(total)) {
      setError("Please enter valid numbers for marks.");
      return;
    }
    if (total <= 0) {
      setError("Total marks must be greater than zero.");
      return;
    }
    if (obtained < 0) {
      setError("Obtained marks cannot be negative.");
      return;
    }
    if (obtained > total) {
      setError("Obtained marks cannot be greater than total marks.");
      return;
    }
    setPercentage(((obtained / total) * 100).toFixed(2));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marks Percentage Calculator</CardTitle>
        <CardDescription>
          Enter your obtained marks and the maximum total marks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Marks You Obtained"
            value={obtainedMarks}
            onChange={(e) => setObtainedMarks(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Maximum Total Marks"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Button onClick={calculatePercentage}>Calculate Percentage</Button>
        </div>
        {error && (
          <div className="mt-6 text-center bg-destructive/10 text-destructive p-3 rounded-lg">
            <p className="font-semibold">{error}</p>
          </div>
        )}
        {percentage !== null && (
          <div className="mt-6 text-center bg-muted p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Your Percentage is:</h3>
            <p className="text-4xl font-bold text-primary">{percentage}%</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// =================================================================
//  4. Main Page Component holding all three tabs
// =================================================================
const CalculatorPage = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="sgpa" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sgpa">SGPA</TabsTrigger>
          <TabsTrigger value="cgpa">CGPA</TabsTrigger>
          <TabsTrigger value="percentage">Marks %</TabsTrigger>
        </TabsList>
        <TabsContent value="sgpa">
          <SgpaCalculator />
        </TabsContent>
        <TabsContent value="cgpa">
          <CgpaCalculator />
        </TabsContent>
        <TabsContent value="percentage">
          <PercentageCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalculatorPage;
