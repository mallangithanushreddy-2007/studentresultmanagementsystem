export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  email: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
}

export interface Result {
  id: string;
  studentId: string;
  subjectId: string;
  marks: number;
  grade: string;
  semester: string;
}

// In-Memory Data Store (Fallback)
let memoryStudents: Student[] = [
  { id: '1', name: 'Alice Smith', rollNumber: 'CS101', department: 'Computer Science', email: 'alice@example.com' },
  { id: '2', name: 'Bob Johnson', rollNumber: 'EE202', department: 'Electrical Eng.', email: 'bob@example.com' }
];

let memorySubjects: Subject[] = [
  { id: '1', name: 'Data Structures', code: 'CS201', credits: 4 },
  { id: '2', name: 'Algorithms', code: 'CS301', credits: 4 }
];

let memoryResults: Result[] = [
  { id: '1', studentId: '1', subjectId: '1', marks: 85, grade: 'A', semester: 'Fall 2026' }
];

// Helper to check if Postgres is configured
const hasPostgres = () => !!process.env.POSTGRES_URL;

export const db = {
  // --- STUDENTS ---
  async getStudents(): Promise<Student[]> {
    if (hasPostgres()) {
      // Implement real PG query here later
      return [];
    }
    return [...memoryStudents];
  },
  async createStudent(data: Omit<Student, 'id'>): Promise<Student> {
    const newStudent = { ...data, id: Date.now().toString() };
    if (hasPostgres()) {
       // Implement real PG query here later
    } else {
      memoryStudents.push(newStudent);
    }
    return newStudent;
  },

  // --- SUBJECTS ---
  async getSubjects(): Promise<Subject[]> {
    if (hasPostgres()) {
      return [];
    }
    return [...memorySubjects];
  },

  // --- RESULTS ---
  async getResults(): Promise<(Result & { studentName: string, subjectName: string })[]> {
    if (hasPostgres()) {
       return [];
    }
    return memoryResults.map(r => {
      const student = memoryStudents.find(s => s.id === r.studentId);
      const subject = memorySubjects.find(s => s.id === r.subjectId);
      return {
        ...r,
        studentName: student?.name || 'Unknown',
        subjectName: subject?.name || 'Unknown'
      };
    });
  },
  async createResult(data: Omit<Result, 'id'>): Promise<Result> {
    const newResult = { ...data, id: Date.now().toString() };
    if (hasPostgres()) {
       // Implement real PG query
    } else {
      memoryResults.push(newResult);
    }
    return newResult;
  }
};
