import { PrismaClient } from '@prisma/client'
import express, {Request, Response} from "express";

const cors = require('cors');

const prisma = new PrismaClient();

// async function main() {
//     const users = await prisma.user.findMany()
//     console.log(users)
// }

// main().catch(e => {
//     console.error(e.message)
// }).finally(async () => {
//     await prisma.$disconnect
// })


const app = express();
app.use(express.json())

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

app.get("/dashboard", async (req: Request, res: Response) => {
    //console.log("Users")
    try {
        const users = await prisma.user.findMany();
        const properties = await prisma.listing.findMany();
        //console.log(users);
        //res.send(users)
        const result = { users, properties };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
})

app.get("/users", async (req: Request, res: Response) => {
    //console.log("Users")
    try {
        const users = await prisma.user.findMany();
        //console.log(users);
        //res.send(users)
        const result = { users };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
})

app.get("/agents", async (req: Request, res: Response) => {
    //console.log("agents")
    try {
        const users = await prisma.user.findMany();
        //console.log(users);
        //res.send(users)
        const result = { users };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
})

app.get("/properties", async (req: Request, res: Response) => {
    //console.log("properties")
    try {
        const properties = await prisma.listing.findMany();
        //console.log(properties);
        //res.send(properties)
        const result = { properties };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
})

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
                updatedAt: new Date().toISOString(),
            },
        });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to update data" });
    }
})

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
                updatedAt: new Date().toISOString(),
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