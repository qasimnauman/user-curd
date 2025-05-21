import { ApiError } from "../util/apiError.js";
import { ApiResponse } from "../util/apiResponse.js";
import { asyncHandler } from "../util/asynchandler.js";
import { User } from "../models/user.model.js"

const getAllUsers = asyncHandler(
    async (req, res) => {
        const users = await User.find();

        return res.status(200).json(
            new ApiResponse(
                200, users, "User fetched successfully"
            )
        )
    }
)

const getUserbyId = asyncHandler(
    async (req, res) => {
        const { id } = req.params

        if (!id) {
            throw new ApiError(
                400, "User id not found"
            )
        }

        const user = await User.findById(id)

        if (!user) {
            throw new ApiError(
                404, "User not found"
            )
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    user,
                    `User for ${id} fetched successfully`
                )
            )
    }
)

const addUser = asyncHandler(
    async (req, res) => {
        const {
            name,
            email,
            age
        } = req.body

        if (
            [name, email, age].some((feild) => feild?.trim() === "")
        ) {
            throw new ApiError(
                400, "All Feilds are required"
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Apierror(400, "Invalid Email");
        }

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            throw new ApiError(
                409,
                `User with ${email} already exists`
            )
        }

        const user = await User.create({
            name,
            email,
            age
        })

        console.log("New User", user);

        if (!user) {
            throw new ApiError(
                500,
                "Something went wrong while creating the user"
            )
        }

        return res.status(201)
            .json(
                new ApiResponse(
                    201,
                    user,
                    "New User Created Successfully"
                )
            )
    }
)

const updateUser = asyncHandler(
    async (req, res) => {
        const { name, email, age } = req.body;

        if ([name, email, age].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "Name, email, and age are required");
        }

        const existedUser = await User.findOne({ email });

        if (!existedUser) {
            throw new ApiError(404, "No User found");
        }

        const updatedUser = await User.findByIdAndUpdate(
            existedUser._id,
            { name, age },
            { new: true }
        );

        if (!updatedUser) {
            throw new ApiError(500, "Something went wrong");
        }

        return res.status(200).json(
            new ApiResponse(200, updatedUser, `User with ${email} updated`)
        );
    }
);


const deletUser = asyncHandler(
    async (req, res) => {
        const { email } = req.params;

        if (!email) {
            throw new ApiError(404, "Email not found");
        }

        const existedUser = await User.findOne({ email });

        if (!existedUser) {
            throw new ApiError(404, `User with ${email} not found`);
        }

        const deletedUser = await User.findByIdAndDelete(existedUser._id);

        if (!deletedUser) {
            throw new ApiError(500, "Failed to delete user");
        }

        return res.status(200).json(
            new ApiResponse(200, deletedUser, `User with ${email} deleted successfully`)
        );
    }
);


export {
    getAllUsers,
    getUserbyId,
    addUser,
    updateUser,
    deletUser
}