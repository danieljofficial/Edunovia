/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *         error:
 *           type: string
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *               message:
 *                 type: string
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *         data:
 *           type: object
 *
 *     AcademicSession:
 *       type: object
 *       required:
 *         - name
 *         - startDate
 *         - endDate
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "2024/2025 Academic Year"
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2024-09-01T00:00:00Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2025-07-31T00:00:00Z"
 *         isCurrent:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     AcademicTerm:
 *       type: object
 *       required:
 *         - name
 *         - termNumber
 *         - startDate
 *         - endDate
 *         - sessionId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: "First Term"
 *         termNumber:
 *           type: integer
 *           minimum: 1
 *           maximum: 3
 *           example: 1
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         isCurrent:
 *           type: boolean
 *         sessionId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 20
 *           example: "john_doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@edunovia.com"
 *         role:
 *           type: string
 *           enum: [STUDENT, TEACHER, ADMIN, PARENT]
 *           example: "TEACHER"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT access token
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           $ref: '#/components/schemas/User'
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 20
 *           pattern: '^[a-zA-Z0-9_]{3,20}$'
 *           example: "john_doe"
 *           description: Must be 3-20 characters, letters, numbers, and underscores only
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@edunovia.com"
 *         password:
 *           type: string
 *           minLength: 8
 *           example: "securePassword123"
 *           description: Must be at least 8 characters long
 *         role:
 *           type: string
 *           enum: [STUDENT, TEACHER, ADMIN, PARENT]
 *           example: "TEACHER"
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@edunovia.com"
 *         password:
 *           type: string
 *           example: "securePassword123"
 *
 *     HealthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "OK"
 *           description: Service health status
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00.000Z"
 *           description: Current server timestamp
 *         uptime:
 *           type: number
 *           example: 3600.5
 *           description: Server uptime in seconds
 *
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@edunovia.com"
 *           description: User's registered email address
 *
 *     ForgotPasswordResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Password reset email sent if account exists"
 *
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - token
 *         - newPassword
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *           description: Password reset token received via email
 *         newPassword:
 *           type: string
 *           minLength: 8
 *           example: "newSecurePassword123"
 *           description: New password (minimum 8 characters)
 *
 *     ResetPasswordResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Password reset successfully"
 *
 *     ValidateTokenRequest:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *           description: Password reset token to validate
 *
 *     ValidateTokenResponse:
 *       type: object
 *       properties:
 *         valid:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Token is valid"
 *
 *     Grade:
 *       type: object
 *       required:
 *         - level
 *         - section
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         level:
 *           type: integer
 *           minimum: 1
 *           maximum: 6
 *           example: 1
 *           description: Grade level (1-6)
 *         name:
 *           type: string
 *           example: "Grade 1"
 *           description: Auto-generated grade name
 *         section:
 *           type: string
 *           enum: [JUNIOR, SENIOR]
 *           example: "JUNIOR"
 *           description: School section classification
 *         arms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ClassArm'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ClassArm:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           enum: [A, B, C]
 *           example: "A"
 *           description: Class arm identifier (A, B, or C)
 *         fullName:
 *           type: string
 *           example: "Grade 1A"
 *           description: Auto-generated full class name
 *         gradeId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateGradeRequest:
 *       type: object
 *       required:
 *         - level
 *         - section
 *       properties:
 *         level:
 *           type: integer
 *           minimum: 1
 *           maximum: 6
 *           example: 1
 *           description: Grade level must be between 1 and 6
 *         section:
 *           type: string
 *           enum: [JUNIOR, SENIOR]
 *           example: "JUNIOR"
 *           description: Section must be either JUNIOR or SENIOR
 *
 *     CreateClassArmRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           enum: [A, B, C]
 *           example: "A"
 *           description: Arm name must be A, B, or C
 *
 *   parameters:
 *     SessionIdParam:
 *       in: path
 *       name: sessionId
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: Academic Session ID
 *
 *     GradeIdParam:
 *       in: path
 *       name: gradeId
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: Grade ID
 *
 *     SectionQueryParam:
 *       in: query
 *       name: section
 *       required: false
 *       schema:
 *         type: string
 *         enum: [JUNIOR, SENIOR]
 *       description: Filter grades by section
 *
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             success: false
 *             message: "Unauthorized access"
 *             error: "Invalid token"
 *
 *     InvalidPasswordError:
 *       description: Invalid password provided during login
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             success: false
 *             message: "Invalid Password!"
 *
 *     ValidationError:
 *       description: Request validation failed
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           examples:
 *             sessionValidation:
 *               value:
 *                 success: false
 *                 message: "Validation failed"
 *                 errors:
 *                   - field: "name"
 *                     message: "Session name is required"
 *             authValidation:
 *               value:
 *                 success: false
 *                 message: "Validation failed"
 *                 errors:
 *                   field: "Invalid email address"
 *
 *     NotFoundError:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           examples:
 *             sessionNotFound:
 *               value:
 *                 success: false
 *                 message: "Academic session not found"
 *             userNotFound:
 *               value:
 *                 success: false
 *                 message: "User Not Found!"
 *             termsNotFound:
 *               value:
 *                 success: false
 *                 message: "Terms not found"
 *
 *
 *     HealthCheckSuccess:
 *       description: Service is healthy and running
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthResponse'
 *
 *     InvalidTokenError:
 *       description: Invalid or expired password reset token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             success: false
 *             message: "Invalid or expired reset token"
 *
 *     WeakPasswordError:
 *       description: New password does not meet security requirements
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             success: false
 *             message: "Validation failed"
 *             errors:
 *               field: "Password must be at least 8 characters"
 *
 *     DuplicateGradeError:
 *       description: Grade level already exists
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             success: false
 *             message: "Grade level already exists"
 *
 *     DuplicateArmError:
 *       description: Class arm already exists for this grade
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             success: false
 *             message: "Class arm already exists for this grade"
 *
 *     MaxArmsError:
 *       description: Maximum 3 arms allowed per grade
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             success: false
 *             message: "Validation failed"
 *             errors:
 *               field: "Arm name must be A, B, or C"
 */

/**
 * @swagger
 * tags:
 *   - name: Academic
 *     description: Academic sessions and terms management
 *   - name: Authentication
 *     description: User authentication and authorization
 *   - name: Password Reset
 *     description: Password reset and recovery operations
 *   - name: System
 *     description: System health and status endpoints
 *   - name: Grades
 *     description: Grade levels and class arms management
 */
