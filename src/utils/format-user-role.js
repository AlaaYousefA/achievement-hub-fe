export function formatKasitRole(role) {
  switch (role) {
    case 'PROFESSOR':
      return 'Professor';

    case 'ASSOCIATE_PROFESSOR':
      return 'Associate Professor';

    case 'ASSISTANT_PROFESSOR':
      return 'Assistant Professor';

    case 'TEACHER':
      return 'Teacher';

    case 'LECTURER':
      return 'Lecturer';

    case 'BACHELOR_STUDENT':
      return 'Bachelor Student';

    case 'MASTER_STUDENT':
      return 'Master Student';

    case 'PHD_STUDENT':
      return 'PhD Student';

    case 'GRADUATE_STUDENT':
      return 'Graduate Student';

    default:
      return role;
  }
}
