
$(document).ready(function() {
    // Environmental Quiz Game
    let currentQuestion = 1;
    let totalQuestions = 10;
    let score = 0;
    let answered = false;
    
    // Initialize quiz controls
    updateQuizControls();
    
    // Next question button
    $('#quiz-next').on('click', function() {
        if (answered) {
            // Move to next question
            if (currentQuestion < totalQuestions) {
                $('#quiz-question-' + currentQuestion).removeClass('active');
                currentQuestion++;
                $('#quiz-question-' + currentQuestion).addClass('active');
                answered = false;
                updateQuizControls();
            } else {
                // Show results
                $('.quiz-question').removeClass('active');
                $('#quiz-result').show();
                $('.quiz-score').text(score + '/' + totalQuestions);
                
                // Update feedback based on score
                let feedback = '';
                if (score <= 3) {
                    feedback = 'There\'s room for improvement. Keep learning about environmental issues!';
                } else if (score <= 6) {
                    feedback = 'Good job! You have a solid understanding of environmental issues.';
                } else if (score <= 9) {
                    feedback = 'Great work! You\'re well-informed about environmental challenges.';
                } else {
                    feedback = 'Perfect score! You\'re an environmental expert!';
                }
                $('.quiz-feedback').text(feedback);
                
                // Hide controls
                $('.quiz-controls').hide();
            }
        } else {
            // If not answered, show alert
            alert('Please select an answer before proceeding.');
        }
    });
    
    // Previous question button
    $('#quiz-prev').on('click', function() {
        if (currentQuestion > 1) {
            $('#quiz-question-' + currentQuestion).removeClass('active');
            currentQuestion--;
            $('#quiz-question-' + currentQuestion).addClass('active');
            updateQuizControls();
        }
    });
    
    // Restart quiz button
    $('#quiz-restart').on('click', function() {
        // Reset quiz state
        currentQuestion = 1;
        score = 0;
        answered = false;
        
        // Reset UI
        $('.quiz-option').removeClass('selected correct incorrect');
        $('#quiz-result').hide();
        $('#quiz-question-1').addClass('active');
        $('.quiz-controls').show();
        updateQuizControls();
    });
    
    // Handle option selection
    $('.quiz-option').on('click', function() {
        if (!answered) {
            // Mark as answered
            answered = true;
            
            // Get selected option
            const $option = $(this);
            $option.addClass('selected');
            
            // Check if correct
            const isCorrect = $option.data('correct') === true;
            
            // Update UI based on correctness
            if (isCorrect) {
                $option.addClass('correct');
                score++;
            } else {
                $option.addClass('incorrect');
                // Highlight correct answer
                $(this).siblings('[data-correct="true"]').addClass('correct');
            }
            
            // Update button text if last question
            if (currentQuestion === totalQuestions) {
                $('#quiz-next').text('See Results');
            }
        }
    });
    
    // Helper function to update quiz controls
    function updateQuizControls() {
        // Update previous button state
        if (currentQuestion === 1) {
            $('#quiz-prev').addClass('btn-disabled');
        } else {
            $('#quiz-prev').removeClass('btn-disabled');
        }
        
        // Update next button text
        if (currentQuestion === totalQuestions) {
            $('#quiz-next').text('Finish');
        } else {
            $('#quiz-next').text('Next');
        }
    }
    
    // Memory Match Game
    let flippedCards = [];
    let matchedPairs = 0;
    let totalPairs = 4;
    let canFlip = true;
    let moves = 0;
    
    // Shuffle cards
    shuffleCards();
    
    // Card click handler
    $('.memory-card').on('click', function() {
        // Check if card can be flipped
        if (canFlip && !$(this).hasClass('flipped') && !$(this).hasClass('matched')) {
            // Flip card
            $(this).addClass('flipped');
            flippedCards.push($(this));
            
            // Check if two cards are flipped
            if (flippedCards.length === 2) {
                moves++;
                canFlip = false;
                
                // Check if cards match
                if (flippedCards[0].data('pair') === flippedCards[1].data('pair')) {
                    // Cards match
                    flippedCards[0].addClass('matched');
                    flippedCards[1].addClass('matched');
                    flippedCards = [];
                    canFlip = true;
                    matchedPairs++;
                    
                    // Check if game is complete
                    if (matchedPairs === totalPairs) {
                        // Show result
                        $('#memory-result').show();
                        $('#memory-moves').text(moves);
                        
                        // Set star rating based on moves
                        let stars = 3;
                        if (moves > 8) {
                            stars = 2;
                        }
                        if (moves > 12) {
                            stars = 1;
                        }
                        
                        // Update stars display
                        $('#memory-stars').empty();
                        for (let i = 0; i < stars; i++) {
                            $('#memory-stars').append('<i class="fas fa-star"></i> ');
                        }
                    }
                } else {
                    // Cards don't match, flip back after delay
                    setTimeout(function() {
                        flippedCards[0].removeClass('flipped');
                        flippedCards[1].removeClass('flipped');
                        flippedCards = [];
                        canFlip = true;
                    }, 1000);
                }
            }
        }
    });
    
    // Restart memory game
    $('#memory-restart').on('click', function() {
        // Reset game state
        flippedCards = [];
        matchedPairs = 0;
        canFlip = true;
        moves = 0;
        
        // Reset UI
        $('.memory-card').removeClass('flipped matched');
        $('#memory-result').hide();
        
        // Shuffle cards
        shuffleCards();
    });
    
    // Helper function to shuffle cards
    function shuffleCards() {
        const cards = $('.memory-card').toArray();
        
        // Fisher-Yates shuffle algorithm
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        
        // Reappend cards in new order
        $.each(cards, function(i, card) {
            $('.memory-game').append(card);
        });
    }
    
// Waste Sorting Game
document.addEventListener('DOMContentLoaded', function() {
    const wasteItems = document.querySelectorAll('.waste-item');
    const wasteBins = document.querySelectorAll('.waste-bin');
    const sortingResult = document.getElementById('sorting-result');
    const sortingAccuracy = document.getElementById('sorting-accuracy');
    const sortingMessage = document.getElementById('sorting-message');
    const sortingRestart = document.getElementById('sorting-restart');
    
    let totalItems = wasteItems.length;
    let correctItems = 0;
    let itemsProcessed = 0;
    
    // Initialize draggable items
    wasteItems.forEach(item => {
        // Make items draggable
        item.setAttribute('draggable', 'true');
        
        // Add drag event listeners for desktop
        item.addEventListener('dragstart', dragStart);
        
        // Add touch event listeners for mobile
        item.addEventListener('touchstart', touchStart, {passive: false});
        item.addEventListener('touchmove', touchMove, {passive: false});
        item.addEventListener('touchend', touchEnd, {passive: false});
    });
    
    // Add drop event listeners to bins
    wasteBins.forEach(bin => {
        bin.addEventListener('dragover', dragOver);
        bin.addEventListener('dragenter', dragEnter);
        bin.addEventListener('dragleave', dragLeave);
        bin.addEventListener('drop', drop);
    });
    
    // Drag functions for desktop
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.classList.add('dragging');
        }, 0);
    }
    
    function dragOver(e) {
        e.preventDefault();
    }
    
    function dragEnter(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    }
    
    function dragLeave() {
        this.classList.remove('drag-over');
    }
    
    function drop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        
        if (draggable) {
            processItem(draggable, this);
        }
    }
    
    // Touch functions for mobile
    let touchDragging = null;
    
    function touchStart(e) {
        e.preventDefault();
        touchDragging = this;
        this.classList.add('dragging');
        
        // Store the initial touch position
        const touch = e.touches[0];
        this.initialX = touch.clientX - this.offsetLeft;
        this.initialY = touch.clientY - this.offsetTop;
    }
    
    function touchMove(e) {
        if (!touchDragging) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        
        // Calculate new position
        touchDragging.style.position = 'absolute';
        touchDragging.style.zIndex = 1000;
        touchDragging.style.left = (touch.clientX - touchDragging.initialX) + 'px';
        touchDragging.style.top = (touch.clientY - touchDragging.initialY) + 'px';
    }
    
    function touchEnd(e) {
        if (!touchDragging) return;
        e.preventDefault();
        
        // Find which bin the item is over
        const touch = e.changedTouches[0];
        const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const binBelow = elemBelow.closest('.waste-bin');
        
        if (binBelow) {
            processItem(touchDragging, binBelow);
        } else {
            // Reset position if not dropped on a bin
            touchDragging.style.position = '';
            touchDragging.style.left = '';
            touchDragging.style.top = '';
            touchDragging.style.zIndex = '';
            touchDragging.classList.remove('dragging');
        }
        
        touchDragging = null;
    }
    
    // Process the dropped item
    function processItem(item, bin) {
        const correctBin = item.dataset.bin;
        const targetBin = bin.dataset.bin;
        
        // Hide the item from its original position
        item.style.display = 'none';
        
        // Create a clone in the bin
        const clone = item.cloneNode(true);
        clone.style.display = 'block';
        clone.style.position = '';
        clone.style.left = '';
        clone.style.top = '';
        clone.style.zIndex = '';
        clone.classList.remove('dragging');
        bin.appendChild(clone);
        
        // Check if correct
        if (correctBin === targetBin) {
            correctItems++;
            clone.classList.add('correct-item');
        } else {
            clone.classList.add('wrong-item');
        }
        
        itemsProcessed++;
        
        // Check if game is complete
        if (itemsProcessed === totalItems) {
            const accuracy = Math.round((correctItems / totalItems) * 100);
            sortingAccuracy.textContent = accuracy + '%';
            
            if (accuracy >= 80) {
                sortingMessage.textContent = 'Great job! You're a recycling expert!';
            } else if (accuracy >= 50) {
                sortingMessage.textContent = 'Good effort! Keep learning about proper waste sorting.';
            } else {
                sortingMessage.textContent = 'Keep practicing! Proper waste sorting is important for our environment.';
            }
            
            sortingResult.style.display = 'block';
        }
    }
    
    // Restart the game
    sortingRestart.addEventListener('click', function() {
        // Reset counters
        correctItems = 0;
        itemsProcessed = 0;
        
        // Reset items
        wasteItems.forEach(item => {
            item.style.display = 'block';
            item.style.position = '';
            item.style.left = '';
            item.style.top = '';
            item.style.zIndex = '';
            item.classList.remove('dragging');
        });
        
        // Remove cloned items from bins
        wasteBins.forEach(bin => {
            const clonedItems = bin.querySelectorAll('.waste-item');
            clonedItems.forEach(item => bin.removeChild(item));
        });
        
        // Hide result
        sortingResult.style.display = 'none';
    });
});
