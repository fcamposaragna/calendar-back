//getEvents, createEvents, updateEvents(/:id), deleteEvent(/:id)

const getEvents = (req, res)=> {

    res.send({
        ok:true,
        msg:'getEvents'
    })
};

const createEvent = (req, res)=>{

    res.send({
        ok:true,
        msg:'createEvent'
    })
};

const updateEvent = (req, res)=>{

    const { id } = req.params;
    console.log(id);

    res.send({
        ok: true,
        msg:'updateEvent'
    })
}

const deleteEvent = (req, res)=>{

    const { id } = req.params;
    console.log(id);

    res.send({
        ok: true,
        msg:'deleteEvent'
    })
}


module.exports= {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}