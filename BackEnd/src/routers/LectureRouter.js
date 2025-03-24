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

router.get('/lectures', authMiddleware, verifyPermission(['SuperAdmin', 'admin', 'User']), viewAllLectures)
router.get('/lectures/:idLecture', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), viewLecturesById)

router.post('/lectures/create', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), createLecture)

router.patch('/lectures/:idLecture/nameLecture', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateLectureName)
router.patch('/lectures/:idLecture/description', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateLectureDescription)
router.patch('/lectures/:idLecture/dateLecture', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateLectureDate)
router.patch('/lectures/:idLecture/timeLecture', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateLectureTime)
router.patch('/lectures/:idLecture/link_url', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateLecturelink_url)
router.patch('/lectures/:idLecture/video_url', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateLectureVideoUrl)
router.delete('/lectures/:idLecture/delete', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), deleteLecture)

module.exports = router