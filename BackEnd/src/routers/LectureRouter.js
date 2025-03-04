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
  updateLecturelink_url,
  updateLectureVideoUrl,
  deleteLecture,
} = require('../controllers/LectureController')
const authMiddleware = require('../middleware/authMidleware')
const verifyPermission = require('../middleware/roleMiddleware')

router.get('/lectures', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewAllLectures)
router.get('/lectures/:idLecture', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), viewLecturesById)

router.post('/lectures/create', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), createLecture)

router.patch('/lectures/:idLecture/nameLecture', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLectureName)
router.patch('/lectures/:idLecture/description', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLectureDescription)
router.patch('/lectures/:idLecture/dateLecture', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLectureDate)
router.patch('/lectures/:idLecture/timeLecture', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLectureTime)
router.patch('/lectures/:idLecture/link_url', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLecturelink_url)
router.patch('/lectures/:idLecture/video_url', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), updateLectureVideoUrl)
router.delete('/lectures/:idLecture/delete', authMiddleware, verifyPermission(['SuperAdmin', 'Admin']), deleteLecture)

module.exports = router