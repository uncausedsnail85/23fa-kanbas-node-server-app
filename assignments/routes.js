import db from "../Database/index.js";

function AssignmentRoutes(app) {

    // GET all assignments in a course
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
            .filter((a) => a.course === cid);
        res.send(assignments);
    });

    // POST new assignment to a course
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        // console.log(`Before: ${JSON.stringify(db.assignments)}`)
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        // console.log(`After: ${JSON.stringify(db.assignments)}`)
        res.send(newAssignment);
    });

    // DELETE assignment
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });

    // PUT update a assignment
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
            (a) => a._id === aid);
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body
        };
        res.sendStatus(204);
    });


}

export default AssignmentRoutes;