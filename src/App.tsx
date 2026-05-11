import { useState } from 'react'
import './App.css'

interface Student {
  id: string
  name: string
  email: string
  programYear: string
  status: 'active' | 'inactive'
  progressPercent: number
  lastSubmission: string
}

interface StatsCard {
  label: string
  value: string | number
  trend?: string
}

interface NavItem {
  id: string
  label: string
  icon: string
  active: boolean
}

function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // Mock student data
  const students: Student[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', programYear: '3rd Year', status: 'active', progressPercent: 85, lastSubmission: '2 days ago' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', programYear: '2nd Year', status: 'active', progressPercent: 72, lastSubmission: '1 day ago' },
    { id: '3', name: 'Carol Davis', email: 'carol@example.com', programYear: '1st Year', status: 'active', progressPercent: 91, lastSubmission: '5 hours ago' },
    { id: '4', name: 'David Wilson', email: 'david@example.com', programYear: '3rd Year', status: 'inactive', progressPercent: 45, lastSubmission: '2 weeks ago' },
  ]

  const statsCards: StatsCard[] = [
    { label: 'Total Students', value: 124, trend: '+8%' },
    { label: 'Avg Progress', value: '76%', trend: '+5%' },
    { label: 'Active Submissions', value: 98, trend: '+12%' },
    { label: 'Completion Rate', value: '82%', trend: '+3%' },
  ]

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', active: activeTab === 'dashboard' },
    { id: 'students', label: 'Students', icon: '👥', active: activeTab === 'students' },
    { id: 'analytics', label: 'Analytics', icon: '📈', active: activeTab === 'analytics' },
    { id: 'suggestions', label: 'AI', icon: '✨', active: activeTab === 'suggestions' },
    { id: 'profile', label: 'Profile', icon: '👤', active: activeTab === 'profile' },
  ]

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <h1>STACK TRACK</h1>
          </div>
          <div className="user-info">
            <span className="user-name">Dr. Faculty</span>
            <div className="user-avatar">F</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="tab-content">
            <div className="dashboard-header">
              <h2>Welcome Back, Faculty Member</h2>
              <p>Here's your student progress overview</p>
            </div>

            <div className="stats-grid">
              {statsCards.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                  {stat.trend && <span className="stat-trend">{stat.trend}</span>}
                </div>
              ))}
            </div>

            <div className="chart-section">
              <h3>Student Progress Distribution</h3>
              <div className="mock-chart">
                <div className="chart-bar" style={{ height: '60%' }}></div>
                <div className="chart-bar" style={{ height: '75%' }}></div>
                <div className="chart-bar" style={{ height: '85%' }}></div>
                <div className="chart-bar" style={{ height: '45%' }}></div>
                <div className="chart-bar" style={{ height: '92%' }}></div>
              </div>
            </div>

            <div className="recent-section">
              <h3>Recent Submissions</h3>
              <div className="submission-list">
                {students.slice(0, 3).map((student) => (
                  <div key={student.id} className="submission-item">
                    <div className="submission-info">
                      <p className="submission-name">{student.name}</p>
                      <p className="submission-time">{student.lastSubmission}</p>
                    </div>
                    <span className="submission-status">✓ Received</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="tab-content">
            <div className="students-header">
              <h2>Students</h2>
              <input type="text" placeholder="Search students..." className="search-input" />
            </div>

            <div className="students-table">
              <div className="table-header">
                <div className="col-name">Name</div>
                <div className="col-email">Email</div>
                <div className="col-year">Year</div>
                <div className="col-progress">Progress</div>
                <div className="col-status">Status</div>
              </div>

              {students.map((student) => (
                <div
                  key={student.id}
                  className="table-row"
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="col-name">{student.name}</div>
                  <div className="col-email">{student.email}</div>
                  <div className="col-year">{student.programYear}</div>
                  <div className="col-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${student.progressPercent}%` }}></div>
                    </div>
                    <span>{student.progressPercent}%</span>
                  </div>
                  <div className="col-status">
                    <span className={`status-badge status-${student.status}`}>
                      {student.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {selectedStudent && (
              <div className="student-detail-modal">
                <div className="modal-backdrop" onClick={() => setSelectedStudent(null)}></div>
                <div className="modal-content">
                  <button className="modal-close" onClick={() => setSelectedStudent(null)}>✕</button>
                  <h3>{selectedStudent.name}</h3>
                  <div className="detail-grid">
                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                    <p><strong>Year:</strong> {selectedStudent.programYear}</p>
                    <p><strong>Progress:</strong> {selectedStudent.progressPercent}%</p>
                    <p><strong>Last Submission:</strong> {selectedStudent.lastSubmission}</p>
                  </div>
                  <div className="detail-actions">
                    <button className="btn btn-primary">Send Message</button>
                    <button className="btn btn-secondary">View Submissions</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="tab-content">
            <div className="analytics-header">
              <h2>Analytics</h2>
              <div className="filter-group">
                <select className="filter-select">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Semester</option>
                </select>
              </div>
            </div>

            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Submission Trends</h3>
                <div className="mini-chart">
                  <div className="trend-line"></div>
                </div>
              </div>
              <div className="analytics-card">
                <h3>Engagement Metrics</h3>
                <div className="metric-list">
                  <div className="metric">
                    <span>Average Time on Task</span>
                    <strong>2.5 hrs</strong>
                  </div>
                  <div className="metric">
                    <span>Code Quality Score</span>
                    <strong>8.2/10</strong>
                  </div>
                </div>
              </div>
              <div className="analytics-card">
                <h3>Performance Bands</h3>
                <div className="bands">
                  <div className="band excellent">90%+: 42 students</div>
                  <div className="band good">80-89%: 58 students</div>
                  <div className="band fair">70-79%: 18 students</div>
                  <div className="band needs-work">&lt;70%: 6 students</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Suggestions Tab */}
        {activeTab === 'suggestions' && (
          <div className="tab-content">
            <div className="suggestions-header">
              <h2>AI Suggestions</h2>
              <p>Personalized insights for your students</p>
            </div>

            <div className="suggestions-list">
              <div className="suggestion-card">
                <div className="suggestion-icon">💡</div>
                <h4>Struggling Students</h4>
                <p>David Wilson and 2 others are below target progress. Consider reaching out with additional resources.</p>
                <button className="suggestion-action">View Details</button>
              </div>
              <div className="suggestion-card">
                <div className="suggestion-icon">⭐</div>
                <h4>High Performers</h4>
                <p>Carol Davis is exceeding benchmarks. Consider advanced challenges or peer mentoring roles.</p>
                <button className="suggestion-action">View Details</button>
              </div>
              <div className="suggestion-card">
                <div className="suggestion-icon">📌</div>
                <h4>Submission Patterns</h4>
                <p>Most submissions occur on Tuesday-Thursday. Plan office hours accordingly for maximum engagement.</p>
                <button className="suggestion-action">View Details</button>
              </div>
              <div className="suggestion-card">
                <div className="suggestion-icon">🎯</div>
                <h4>Content Mastery</h4>
                <p>Data structures concepts show 34% less mastery than algorithms. Allocate additional time.</p>
                <button className="suggestion-action">View Details</button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="tab-content">
            <div className="profile-container">
              <div className="profile-header">
                <div className="profile-avatar-large">F</div>
                <div className="profile-info">
                  <h2>Dr. Faculty Member</h2>
                  <p>Computer Science Department</p>
                  <p>faculty@university.edu</p>
                </div>
              </div>

              <div className="profile-section">
                <h3>Courses</h3>
                <div className="course-list">
                  <div className="course-item">
                    <p className="course-name">CS 301: Data Structures</p>
                    <p className="course-meta">124 students | Spring 2026</p>
                  </div>
                  <div className="course-item">
                    <p className="course-name">CS 401: Algorithms</p>
                    <p className="course-meta">98 students | Spring 2026</p>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Settings</h3>
                <div className="settings-list">
                  <label className="setting-item">
                    <input type="checkbox" defaultChecked /> Enable email notifications
                  </label>
                  <label className="setting-item">
                    <input type="checkbox" defaultChecked /> Weekly summary reports
                  </label>
                  <label className="setting-item">
                    <input type="checkbox" /> Alert for urgent submissions
                  </label>
                </div>
              </div>

              <div className="profile-actions">
                <button className="btn btn-secondary">Change Password</button>
                <button className="btn btn-secondary">Logout</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${item.active ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
