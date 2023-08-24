export const avatarValidationMiddleware = (req, res, next) => {
    const array_of_allowed_files: string[] = ['png', 'jpeg', 'jpg', 'gif']
    const array_of_allowed_file_types: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (req.body.avatar === '' || req['files'].avatar === null) {
        return res.status(400).json({success: false, errorMessage: "avatar is required"})
    }
    const file_extension = req['files'].avatar.name.slice(
        ((req['files'].avatar.name.lastIndexOf('.') - 1) >>> 0) + 2
    )
    let validFileExtension: boolean = array_of_allowed_files.includes(file_extension)
    let validFileMimeType: boolean = array_of_allowed_file_types.includes(req['files'].avatar.mimetype)
    if (!validFileExtension || !validFileMimeType) {
        return res.status(400).json({message: "invalid file"})
    }
    next()
}