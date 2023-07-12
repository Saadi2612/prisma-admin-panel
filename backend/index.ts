import { PrismaClient } from '@prisma/client'

// using express to work with requests
import express, {Request, Response} from "express";

const cors = require('cors');

// PrismaClient to work with prisma schema
const prisma = new PrismaClient(); 

const app = express();
app.use(express.json())

//Configuring CORS to allow requests to come from Port 3000 to 5000.
app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// GET request for dashboard to show overview of all data
app.get("/dashboard", async (req: Request, res: Response) => {
    
    try {
        const users = await prisma.user.findMany();
        const properties = await prisma.listing.findMany();
        
        // Combining users and properties in a single variable as objects to send both in response
        const result = { users, properties };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
})

// GET request for users
app.get("/users", async (req: Request, res: Response) => {
    
    try {
        const users = await prisma.user.findMany();
        
        const result = { users };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
})

// GET request for agents
app.get("/agents", async (req: Request, res: Response) => {
    
    try {
        const users = await prisma.user.findMany();
        
        const result = { users };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
})

// GET request for properties
app.get("/properties", async (req: Request, res: Response) => {
    
    try {
        const properties = await prisma.listing.findMany();
        
        const result = { properties };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
})

// UPDATE request for updating users
app.put("/users/:id", async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;

        const { email, name } = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email,
                updatedAt: new Date().toISOString(), // time stamp of instance of updating user
            },
        });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to update data" });
    }
})

// UPDATE request for updating agents
app.put("/agents/:id", async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;
        
        const { email, name, agency, agency_description, agency_address } = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email,
                updatedAt: new Date().toISOString(), // time stamp of instance of updating user
                agency: agency,
                agency_description: agency_description,
                agency_address: agency_address,
            },
        });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to update data" });
    }
})

// UPDATE request for updating properties
app.put("/properties/:id", async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;
        
        const { title, description, purpose, price, type, city, locationValue, area, roomCount, 
            bathroomCount, tvLounge, kitchen, drawingRoom, balcony, servantQuaters } = req.body;

        const updatedProperty = await prisma.listing.update({
            where: {
                id: id,
            },
            data: {
                title,
                description,
                purpose,
                price,
                type,
                city,
                locationValue,
                area,
                roomCount,
                bathroomCount,
                tvLounge,
                kitchen,
                drawingRoom,
                balcony,
                servantQuaters,
            },
        });

        res.json(updatedProperty);
    } catch (error) {
        res.status(500).json({ error: "Failed to update data" });
    }
})

// DELETE request for deleting users
app.delete("/users/:id", async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;

        const deletedUser = await prisma.user.delete({
            where: {
                id: id,
            },
        });

        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete data" });
    }
})

// DELETE request for deleting agents
app.delete("/agents/:id", async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;

        const deletedAgent = await prisma.user.delete({
            where: {
                id: id,
            },
        });

        res.json(deletedAgent);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete data" });
    }
})

// DELETE request for deleting properties
app.delete("/properties/:id", async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;

        const deletedProperty = await prisma.listing.delete({
            where: {
                id: id,
            },
        });

        res.json(deletedProperty);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete data" });
    }
})

app.listen(5000, () => {
    console.log("SERVER RUNNING ON PORT 5000")
})