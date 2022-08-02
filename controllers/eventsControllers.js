const Event = require('../models/EventsModel');

const getEvents = async (req, res)=> {

    try{
    
        const events = await Event.find().populate('user', 'name')
        res.send({
            ok:true,
            events
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Problema en el servidor'
        })
    }

};

const createEvent = async (req, res)=>{

    const event = new Event(req.body);

    try{

        event.user = req.uid;
        const eventSaved = await event.save();
        res.json({
            ok: true,
            evento: eventSaved
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Problema en el servidor'
        })
    }
};

const updateEvent = async (req, res)=>{

    const { id } = req.params;
    const uid = req.uid;

    try{

        const event = await Event.findById(id);
        if(!event) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un evento con ese id'
            })
        }
        
        if(event.user.toString()!==uid){
            return res.status(401).json({
                ok:false,
                msg:'Usuario no autorizado para actualizar el evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, {new: true});
        res.json({
            ok:true,
            evento: eventUpdated
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Problema en el servidor'
        })
    }
}

const deleteEvent = async (req, res)=>{

    const { id } = req.params;
    const uid = req.uid;
    try{

        const event = await Event.findById(id);
        if(!event) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un evento con ese id'
            })
        }
        
        if(event.user.toString()!==uid){
            return res.status(401).json({
                ok:false,
                msg:'Usuario no autorizado para actualizar el evento'
            })
        }

        await Event.findByIdAndDelete(id);

        res.json({
            ok:true
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Problema en el servidor'
        })
    }
}


module.exports= {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}