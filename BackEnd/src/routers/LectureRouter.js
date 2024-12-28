const express = require('express')
const router = express.Router()
const {
  viewAllLectures,
  viewLecturesById,
  createLecture,
  updateLectureName,
  updateLectureDescription,
  updateLectureDate,
  updateLectureTime,
  updateLectureLink,
  updateLectureVideoUrl,
  deleteLecture,
} = require('../controllers/LectureController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/lectures', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewAllLectures)
router.get('/lectures/:idLecture', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewLecturesById)

router.post('/lectures/create', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), createLecture)

router.patch('/lectures/:idLecture/name', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLectureName)
router.patch('/lectures/:idLecture/description', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLectureDescription)
router.patch('/lectures/:idLecture/date', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLectureDate)
router.patch('/lectures/:idLecture/time', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLectureTime)
router.patch('/lectures/:idLecture/link', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLectureLink)
router.patch('/lectures/:idLecture/videoUrl', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLectureVideoUrl)

router.delete('/lectures/:idLecture/delete', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), deleteLecture)

module.exports = router