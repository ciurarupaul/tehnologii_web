/* 
### to do

ENTITIES
  USER
    _id (unique)
    role (student / professor / admin) (enum)
    email (unique)
  
  ACTIVITY
    _id (unique)  
    professorId
    title / description
    startTime / endTime
    status (past, active, future) (enum)
    accessCode (unique)
    enrolledStudents

  FEEDBACK
    _id (unique)
    activityId
    studentId
    type (smiley / frowny / surprised / confused) (enum)
    comment (optional)
    timestamp

PAGES
  - general -------------------------------------

    /login
      login page
        users should be able to logout or change their accounts

  - students ------------------------------------

    /dashboard
      form to enroll in a new activity
      list of all the activities the student is enrolled in

    /activity/:id
      see activity
      offer feedback

  - professors ----------------------------------
  
    /dashboard
      see all activities defined by the professor
      start/stop button for each activity
        
      /activity/new
        create a new activity

      /activity/:id/edit
        edit existing activities

      /activity/:id/results
        see the feedback for a specific activity
  
      ???
      feedback graphs?

  - admin ---------------------------------------

    /dashboard
      mark users as professors/students
*/
