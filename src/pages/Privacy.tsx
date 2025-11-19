export function Privacy() {
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">📄 소복(SOBOK) 개인정보처리방침</h1>
          
          <p className="text-gray-600 mb-8">
            시행일: 2025년 11월 19일
          </p>

          <p className="mb-8 leading-relaxed">
            소복(SOBOK)(이하 '회사')는 「개인정보 보호법」과 관련 법령을 준수하며, 고객의 개인정보를 안전하게 보호하기 위해 최선을 다하고 있습니다. 본 개인정보처리방침은 보자기 제작 및 상담 서비스 이용과 관련하여 개인정보가 어떤 방식으로 수집·이용·보관·파기되는지 안내하기 위한 것입니다.
          </p>

          <p className="mb-12 text-gray-600">
            본 방침은 서비스 운영 정책에 따라 변경될 수 있으며, 변경 시 웹사이트를 통해 공지합니다.
          </p>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">1. 수집하는 개인정보 항목</h2>
            <p className="mb-4">회사는 상담 신청 및 문의 접수 시 다음의 개인정보를 수집합니다.</p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">① 필수 수집 항목</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>회사명</li>
                <li>담당자명</li>
                <li>연락처(휴대폰 또는 전화번호)</li>
                <li>이메일 주소</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">② 선택 수집 항목</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>회사 홈페이지/온라인 채널 주소</li>
                <li>필요 수량, 납기일 등 프로젝트 정보</li>
                <li>디자인 파일(브랜드 직조 보자기 요청 시)</li>
                <li>기타 사용자가 입력한 문의 내용</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">③ 자동 수집 항목</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>접속 IP, 방문 일시, 브라우저 정보, 이용기록(쿠키 포함)</li>
              </ul>
            </div>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">2. 개인정보의 수집 및 이용 목적</h2>
            <p className="mb-4">회사는 수집한 개인정보를 다음의 목적 범위 내에서만 이용합니다.</p>
            
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>상담 신청 및 견적 제공</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>문의 내용 확인</li>
                  <li>상담 연락 및 제작 가능 여부 검토</li>
                  <li>파일 기반 목업 제작 및 제안</li>
                </ul>
              </li>
              <li>
                <strong>고객관리 및 서비스 제공</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>서비스 제공 관련 안내</li>
                  <li>고객 요청 처리 및 커뮤니케이션</li>
                </ul>
              </li>
              <li>
                <strong>서비스 개선 및 내부 기록 관리</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>문의 통계 분석</li>
                  <li>서비스 품질 개선</li>
                </ul>
              </li>
              <li><strong>법령 준수</strong></li>
            </ol>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="mb-4">회사는 개인정보를 다음 기간 동안 보관합니다.</p>
            
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>문의 및 상담 기록: 3년 보관 후 즉시 파기</li>
              <li>전자상거래 관련 계약 및 거래 기록: 5년 (해당 시)</li>
              <li>웹사이트 방문 기록: 3개월</li>
            </ul>

            <p className="text-gray-600">※ 이용자가 삭제 요청 시 지체 없이 파기됩니다.</p>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">4. 개인정보의 제3자 제공</h2>
            <p className="mb-4">회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다.</p>
            <p className="text-gray-600">다만, 법령에 따른 요청이 있는 경우 예외로 합니다.</p>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">5. 개인정보 처리 위탁</h2>
            <p className="mb-4">회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁할 수 있습니다.</p>
            <p className="mb-4">회사는 위탁 시 개인정보 보호 법령 준수 여부를 확인합니다.</p>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">6. 개인정보의 파기 절차 및 방법</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">파기 절차</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>수집된 개인정보는 보유 기간 경과 또는 처리 목적 달성 시 파기됩니다.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">파기 방법</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>전자 파일: 복구 불가능한 방식으로 영구 삭제</li>
                <li>출력물: 분쇄 또는 소각</li>
              </ul>
            </div>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">7. 이용자의 권리</h2>
            <p className="mb-4">이용자는 다음의 권리를 행사할 수 있습니다.</p>
            
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>개인정보 열람 요구</li>
              <li>정정·삭제 요구</li>
              <li>처리 정지 요구</li>
            </ul>

            <p className="text-gray-600">회사는 본인 확인 후 요청 사항을 처리합니다.</p>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">8. 개인정보 안전성 확보 조치</h2>
            <p className="mb-4">회사는 개인정보 보호를 위해 다음 조치를 시행합니다.</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>접근 권한 최소화</li>
              <li>비밀번호/파일 암호화</li>
              <li>접속 로그 및 관리 기록 보관</li>
              <li>외부 서비스의 보안정책 준수</li>
            </ul>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">9. 쿠키(Cookie) 운영 안내(선택적)</h2>
            <p className="mb-4">회사는 사용자 편의 기능 제공 및 접속 기록 분석을 위해 쿠키를 사용할 수 있습니다.</p>
            <p className="text-gray-600">이용자는 웹 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.</p>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">10. 개인정보 보호책임자</h2>
            <p className="mb-4">회사는 이용자의 개인정보를 보호하기 위해 다음과 같이 개인정보보호책임자를 지정합니다.</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>개인정보보호책임자: 김한재</li>
              <li>이메일: <a href="mailto:jay@faddit.co.kr" className="text-blue-600 hover:underline">jay@faddit.co.kr</a></li>
              <li>연락처: <a href="tel:010-5662-0796" className="text-blue-600 hover:underline">010-5662-0796</a></li>
            </ul>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">11. 고지 의무</h2>
            <p className="mb-4">본 개인정보처리방침은 2025년 11월 19일부터 적용됩니다.</p>
            <p className="text-gray-600">변경 사항이 있을 경우 웹사이트 공지를 통해 안내합니다.</p>
          </section>
        </div>
      </div>
    </main>
  )
}

