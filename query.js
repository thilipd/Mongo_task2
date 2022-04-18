// creating database
use("guvi")

//creating collections in guvi
db.createCollection("topics")
db.createCollection("tasks")
db.createCollection("mentor")
db.createCollection("attendance")
db.createCollection("users")
db.createCollection("codekata")
db.createCollection("company_drives")

//inserting data into  collection
db.topics.insert([
    {
        "topic_name": "HTML",
        "month": "august",
        "duration": "30hrs"
    },
    {
        "topic_name": "css",
        "month": "september",
        "duration": "20hrs"
    },
    {
        "topic_name": "js",
        "month": "october",
        "duration": "30hrs"
    },
    {
        "topic_name": "react",
        "month": "october",
        "duration": "15hrs"
    },
    {
        "topic_name": "database",
        "month": "october",
        "duration": "10hrs"
    },
])
db.tasks.insert([
    {
        "task_name": "HTML",
        "month": "august"
    },
    {
        "task_name": "css",
        "month": "september"
    },
    {
        "task_name": "js",
        "month": "october"
    },
    {
        "task_name": "react",
        "month": "october"
    },
    {
        "task_name": "database",
        "month": "october"
    },
])
db.company_drives.insert([
    {
        "company": "paytym",
        "date": new Date("10/1/2020").toLocaleDateString()
    },
    {
        "company": "",
        "date": new Date("10/5/2020").toLocaleDateString()
    },
    {
        "company": "facebook",
        "date": new Date("10/10/2020").toLocaleDateString()
    },
    {
        "company": "microsoft",
        "date": new Date("10/15/2020").toLocaleDateString()
    },
    {
        "company": "youtube",
        "date": new Date("10/20/2020").toLocaleDateString()
    }
])
db.users.insert([
    {
        "user_name": "user1",
        "user_id": 1,
        "task_submitted": new Date("10/10/2020").toLocaleDateString(),
        "company_attended": "google"
    },
    {
        "user_name": "user2",
        "user_id": 2,
        "task_submitted": new Date("10/15/2020").toLocaleDateString(),
        "company_attended": ""
    },
    {
        "user_name": "user3",
        "user_id": 3,
        "task_submitted": new Date("10/19/2020").toLocaleDateString(),
        "company_attended": "facebook"
    },
    {
        "user_name": "user4",
        "user_id": 4,
        "task_submitted": new Date("10/30/2020").toLocaleDateString(),
        "company_attended": "microsoft"
    },
    {
        "user_name": "user5",
        "user_id": 5,
        "task_submitted": new Date("10/5/2020").toLocaleDateString(),
        "company_attended": ""
    },
])
db.codekata.insert([
    {
        "user_id": 1,
        "solved": 100
    },
    {
        "user_id": 2,
        "solved": 80
    },
    {
        "user_id": 3,
        "solved": 10
    },
    {
        "user_id": 4,
        "solved": 150
    },
    {
        "user_id": 5,
        "solved": 50
    },
])
db.mentor.insert([
    {
        "mentor_name": "aaa",
        "count": 20
    },
    {
        "mentor_name": "bbb",
        "count": 15
    },
    {
        "mentor_name": "ccc",
        "count": 30
    },
    {
        "mentor_name": "ddd",
        "count": 10
    },
    {
        "mentor_name": "eee",
        "count": 40
    },
])
db.attendance.insert([
    {
        "user_id": 1,
        "attendence": "50%",
        "absent": new Date("10/16/2020").toLocaleDateString()
    },
    {
        "user_id": 2,
        "attendence": "60%",
        "absent": new Date("10/10/2020").toLocaleDateString()
    },
    {
        "user_id": 3,
        "attendence": "30%",
        "absent": new Date("10/20/2020").toLocaleDateString()
    },
    {
        "user_id": 4,
        "attendence": "80%",
        "absent": new Date("10/18/2020").toLocaleDateString()
    },
    {
        "user_id": 5,
        "attendence": "65%",
        "absent": new Date("10/1/2020").toLocaleDateString()
    },
])
db.users.remove({})
db.attendance.remove({})
// 1.Find all the topics and tasks which are thought in the month of October
db.tasks.aggregate([
    {
        $lookup: {
            from: "topics",
            localField: "task_name",
            foreignField: "topic_name",
            as: "output"
        }
    },
    {
        $project: {
            _id: 0,
            task_name: 1,
            month: 1,
            output: { topic_name: 1, month: 1 }
        }
    },
    {
        $match: {
            month: "october"
        }
    },

])

//2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.company_drives.find({ $and: [{ date: { $gte: '15/10/2020' } }, { date: { $lte: '31/10/2020' } }] }, { _id: 0 })

//3.Find all the company drives and students who are appeared for the placement.
db.company_drives.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "company",
            foreignField: "company_attended",
            as: "result"
        }
    },
    {
        $project: {
            _id: 0,
            result: { _id: 0, company_attended: 0 }
        }
    }

])

// Find the number of problems solved by the user in codekata
db.codekata.find({ user_id: 4 }, { _id: 0 })
// Find all the mentors with who has the mentee's count more than 15
db.mentor.find({ count: { $gt: 15 } })
// Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.attendance.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "user_id",
            as: "output"
        }
    },

    {
        $project: {
            attendence: 0,
            output: { _id: 0, user_name: 0, company_attended: 0 }
        }
    },
    {
        $match: {
            absent: { $gte: "15/10/2020", $lte: "31/10/2020" },
            // task_submitted:{$gte:"15/10/2020" , $lte:"31/10/2020"}
        }
    }
])

    
])
