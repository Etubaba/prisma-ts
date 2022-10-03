import { Response, Request } from "express";
import { prisma } from "../app";


const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.users.findMany()
        res.status(200).json({ status: true, data: users });
    } catch (err: any) {
        console.log(err.message)
        await prisma.$disconnect();
        process.exit(1);
    }
}
const getUser = async (req: Request, res: Response): Promise<void> => {
    const id: number = Number(req.params.id)

    try {
        const user = await prisma.users.findUnique({
            where: { id: id },
        }
        )
        if(user){
           res.json({ status: true, data: user }) 
        }else{
            res.status(403).json({ status: false,msg:' No user found'})
        }
        
    } catch (err: any) {


        console.log(err.message)
        await prisma.$disconnect();
        process.exit(1);

    }

}


const createUser = async (req: Request, res: Response): Promise<void> => {
 

    type userPost = {
        name: string,
        email: string,
        password: string,
        username: string,
    }
    const { name, email, password, username }: userPost = req.body

    if (!name || !email || !password || !username) res.status(401).json({ status: false, msg: 'Please enter all fields' })

    try {
        const newUser = await prisma.users.create({
            data: {
                Name: name,
                Email: email,
                Password: password,
                username: username,
                joinAt: new Date(),
            },
        })
        res.json({ status: true, data: newUser })

    } catch (err: any) {
        console.log(err.message)
         await prisma.$disconnect();
        process.exit(1);
    }
}
const updateUser = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)
     type userPost = {
            name: string,
            email: string,
        }
        const { name, email }: userPost = req.body

    try {
       
        const updatedUser = await prisma.users.update({
            where: { id: id },
            data: { Email: email, Name: name },
        })
        if(updatedUser){
            res.json({status:true, data:updatedUser})
        }else{
            res.status(400).json({status:false, msg:'No data found'})
        }

    } catch (err: any) { 
        console.log(err.message)  
        await prisma.$disconnect();
        process.exit(1); }

}

const deleteUser= async (req: Request, res: Response) => {
 const id:number = Number(req.params.id)
    try{
        const deleteUser = await prisma.users.delete({
            where: {id:id},
        })
      res.json({status:true,msg:'user deleted successfully'})
    }catch(err: any) {
        console.error(err.message);
         await prisma.$disconnect();
        process.exit(1);
    }
}






export { getAllUsers,deleteUser,updateUser,createUser,getUser }


