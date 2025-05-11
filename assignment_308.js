
// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
};
// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50,
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150,
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500,
        },
    ],
};
// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47,
        },
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150,
        },
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400,
        },
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39,
        },
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140,
        },
    },
];


function getLearnerData(course, ag, submissions) {

    console.log("****** 1. Get Unique Learner IDs from student Data ******* ");
    const uniqueArray = []
    const duplicateArray = []
    for (let i = 0; i < submissions.length; i++) {

        const id = submissions[i].learner_id;
        duplicateArray.push(id);
        if (uniqueArray.indexOf(id) === -1) {
            uniqueArray.push(id);
        }
    }
    console.log("Duplicate IDs in an Array : [" + duplicateArray + "]");
    console.log("Unique IDs in an Array : [" + uniqueArray + "]");

    console.log("****** 2.convert it into array of object where you have a key called id ******* ");

    let idArray = [];
    let studentAry = [];
    for (let j = 0; j < uniqueArray.length; j++) {
        let obj = {
            id: uniqueArray[j]
        }
        idArray.push(obj);

        let obj1 = {
            id: uniqueArray[j]
        }
        studentAry.push(obj1);
    }
    // ID Array having two objects. 
    console.log(idArray);

    console.log(" 3. get the assignments and calulcate the grade  find the assignment for each student and thier score ");

    for (let i = 0; i < submissions.length; i++) {

        const id = submissions[i].learner_id;
        const assignment_id = submissions[i].assignment_id;
        const score = submissions[i].submission.score;

        for (j = 0; j < idArray.length; j++) {
            let idObj = idArray[j];
            if (idObj.id === id) {
                idObj[assignment_id] = score;
            }
        }
    }
    console.log("Data in idArray :");
    console.log(idArray);


    //part 4
    console.log("********Possible Points for each assignments ********");
    const possible_pts = [];
    const due_dates = [];
    for (let i = 0; i < ag.assignments.length; i++) {
        const p_points = ag.assignments[i].points_possible;
        const due_date = ag.assignments[i].due_at;
        const ag_assignment_id = ag.assignments[i].id;
        // possible_pts[ag_assignment_id] = p_points;

        let obj = {};

        obj[ag_assignment_id] = p_points;
        // obj[ag_assignment_id] = due_date;
        possible_pts.push(obj);

        let obj1 = {};
        obj1[ag_assignment_id] = due_date;
        due_dates.push(obj1);

    }


    console.log(possible_pts);

    console.log("********Due Date for each Assignments.********");
    console.log(due_dates);

    console.log("********Calculate Score for each Assignments.********");

    let results = [];

    for (j = 0; j < submissions.length; j++) {

        const assignment_id = submissions[j].assignment_id;
        const learner_id = submissions[j].learner_id;
        const submissionDate = submissions[j].submission.submitted_at;
        // console.log("Assignment Submission Date : " +learner_id +" : "  + assignment_id + " : " +submissionDate);


        let ptsArray = possible_pts.filter((item) => { return (item[assignment_id]) });

        const points = ptsArray[0][assignment_id];

        let dueDateAry = due_dates.filter((item) => { return (item[assignment_id]) });
        const due_date = dueDateAry[0][assignment_id];

        let isAssignmentSubmittedOnTime;

        if (submissionDate <= due_date) {
            isAssignmentSubmittedOnTime = true;
            console.log("Assignment submitted on time : Student ID :" + learner_id + " Assignment ID :" + assignment_id + " Submission Date :" + submissionDate + " Due Date :" + due_date);
        } else {
            isAssignmentSubmittedOnTime = false;
            console.log("Assignment overdue not due for : Student ID :" + learner_id + " Assignment ID :" + assignment_id + " Submission Date :" + submissionDate + " Due Date :" + due_date);
        }

        let grade;
        if (isAssignmentSubmittedOnTime) {
            // console.log(ptsArray.toString() +  points)
            grade = (submissions[j].submission.score / points);
        } else {
            grade = ((submissions[j].submission.score - 15) / points); // reduce 15 marks since the assignment not submitted on time
        }
        studentAry.forEach(item => {
            if (item["id"] === learner_id) {
                item[assignment_id] = Number(grade.toFixed(2));
            }
        });

    }

    console.log(studentAry);

    //5 To calculate average. 
    console.log("Block to Calculate Average out of Final score  ");

    const averages = studentAry.map(obj => {
        let sum = 0;
        let count = 0;

        for (const key in obj) {
            if (key !== 'id') {
                sum += obj[key];
                count++;
            }
        }

        const average = count > 0 ? sum / count : 0;
        return { ...obj, avg: Number(average.toFixed(2)) };
    });

    console.log(averages);





    return averages;
}



const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);


console.log(result);


// here, we would process this data to achieve the desired result.
// 1.
// first all i need to figure out who are the sutdents
// generate an array of unique students ids
//generate an array of students ids [125,125,125,132,132]
//genere this [125,125,125,132,132] from submissions
// make it unique[125,132]
// 2.convert it into array of object where you have a key called id
// then value be studendid
// [{id:125},{id:132}]
//3. get the assignments and calulcate the grade
// find the assignment for each student and thier score
// [{id:125,1:47,2:150,3:400},{id:132,1:32,2:140}]
// now you have an object for each student that has score,
//4. we need to calulcate the grade
// go every student and match assignment using id to find points points_possible
// you just devide the score by points points_possible
// [{id:125,1:0.94,2:1.0}]
// avg (add assignment scores together )/ (points possible)
// remove not due assignments
// const result = [
//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0, // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833, // late: (140 - 15) / 150
//   },
// ];

// let result = [];
// write some code that makes results like that
// for (let i = 0; i < submissions.length; i++) {
//   //
// }
// result [125,125,125,32,32]
// return result;
// }
// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
// console.log(result);